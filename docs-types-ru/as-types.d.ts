// The AssemblyScript types the hood's declarations mention. A plugin writes
// number and boolean; these only make the declarations readable to tsc.
type i8 = number;
type i16 = number;
type i32 = number;
type i64 = number;
type isize = number;
type u8 = number;
type u16 = number;
type u32 = number;
type u64 = number;
type usize = number;
type f32 = number;
type f64 = number;
type bool = boolean;
type StaticArray<T> = T[];

declare namespace console {
  /** Logs `message` to console if `assertion` is false-ish. */
  export function assert<T>(assertion: T, message?: string): void;
  /** Outputs `message` to the console. */
  export function log(message?: string): void;
  /** Outputs `message` to the console, prefixed with "Debug:". */
  export function debug(message?: string): void;
  /** Outputs `message` to the console, prefixed with "Info:". */
  export function info(message?: string): void;
  /** Outputs `message` to the console, prefixed with "Warning:". */
  export function warn(message?: string): void;
  /** Outputs `message` to the console, prefixed with "Error:". */
  export function error(message?: string): void;
  /** Starts a new timer using the specified `label`. */
  export function time(label?: string): void;
  /** Logs the current value of a timer previously started with `console.time`. */
  export function timeLog(label?: string): void;
  /** Logs the current value of a timer previously started with `console.time` and discards the timer. */
  export function timeEnd(label?: string): void;
}