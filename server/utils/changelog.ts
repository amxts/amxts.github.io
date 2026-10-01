import process from 'node:process'

/** The repositories of github.com/amxts whose releases the changelog shows. */
export const changelogRepos = ['amxts', 'amxts-cli', 'menu-core', 'config-core', 'resemiclip', 'amxts-vscode']

export interface Release {
  /** The repository: `amxts`, `menu-core`... */
  repo: string
  /** The release's tag: `v0.1.0`. */
  version: string
  /** ISO date of publication. */
  date: string
  /** The release notes, markdown as GitHub has them. */
  body: string
  url: string
}

interface GitHubRelease {
  tag_name: string
  published_at: string | null
  body: string | null
  html_url: string
  draft: boolean
}

/**
 * A repository's published releases, cached for an hour. The site is built
 * without a token, and GitHub answers that too; a token in GITHUB_TOKEN (the
 * deploy workflow's) only raises the rate limit.
 */
const repoReleases = defineCachedFunction(async (repo: string): Promise<Release[]> => {
  const token = process.env.GITHUB_TOKEN
  const releases = await $fetch<GitHubRelease[]>(`https://api.github.com/repos/amxts/${repo}/releases`, {
    query: { per_page: 100 },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 10000,
  })
  return releases
    .filter(release => !release.draft && release.published_at)
    .map(release => ({
      repo,
      version: release.tag_name,
      date: release.published_at!,
      body: release.body ?? '',
      url: release.html_url,
    }))
}, { name: 'github-releases', maxAge: 60 * 60, swr: true, getKey: (repo: string) => repo })

/**
 * Every release of every repository, newest first. A repository GitHub does
 * not answer for is left out with a warning rather than failing the build.
 */
export async function listReleases(): Promise<Release[]> {
  const lists = await Promise.all(changelogRepos.map(async (repo) => {
    try {
      return await repoReleases(repo)
    }
    catch (error) {
      console.warn(`GitHub did not answer for the releases of ${repo}: ${(error as Error).message}`)
      return []
    }
  }))
  return lists.flat().sort((a, b) => b.date.localeCompare(a.date))
}
