/**
 * Examples:
 *
 * log.ok("step 1");
 * log.ok("step 2");
 * log.success("done");
 * log.fail("ruh roh");
 * log.error("dang");
 * log.fatal("kaboom");    // (exit code: 1)
 * log.fatal(2, "kaboom"); // (exit code: 2)
 */

export function log(...args) {
  console.log("▶ ", ...args);
}

export function ok(...args) {
  console.log("✔ ", ...args);
}

export function success(...args) {
  console.log("✅ ", ...args);
}

export function fail(...args) {
  console.log("❌ ", ...args);
}

export function error(...args) {
  console.error("⛔️", ...args);
}

export function fatal(...args) {
  let exitCode = 1;
  if (args.length && typeof args[0] === "number") {
    exitCode = args[0];
    args.shift();
  }
  args.push(`(exit code: ${exitCode})`);
  console.error("💀", ...args);
  process.exit(exitCode);
}

log.ok = ok;
log.success = success;
log.fail = fail;
log.error = error;
log.fatal = fatal;

export default log;
