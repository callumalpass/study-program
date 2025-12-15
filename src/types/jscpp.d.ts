/**
 * Type declarations for JSCPP - A C/C++ interpreter written in JavaScript
 * @see https://github.com/felixhao28/JSCPP
 */

declare module 'JSCPP' {
  interface JSCPPStdio {
    /** Function to handle output */
    write?: (s: string) => void;
    /** Function to supply input dynamically */
    drain?: () => string | null;
  }

  interface JSCPPConfig {
    /** Controls input/output behavior */
    stdio?: JSCPPStdio;
    /** Handle unsigned overflow: 'error' (default), 'warn', or 'ignore' */
    unsigned_overflow?: 'error' | 'warn' | 'ignore';
    /** Maximum execution time in milliseconds */
    maxTimeout?: number;
    /** Enable debug mode */
    debug?: boolean;
    /** Custom includes */
    includes?: Record<string, { load: (rt: unknown) => void }>;
  }

  interface JSCPPDebugger {
    /** Continue execution */
    continue(): void;
    /** Step to next line */
    next(): void;
    /** Step into function */
    stepIn(): void;
    /** Step out of function */
    stepOut(): void;
    /** Get current variable values */
    variable(): Record<string, unknown>;
    /** Get source position */
    src(): { line: number; col: number };
  }

  interface JSCPP {
    /** Run C/C++ code */
    run(code: string, input: string, config?: JSCPPConfig): number | JSCPPDebugger;
    /** Available include headers */
    includes: Record<string, unknown>;
  }

  const JSCPP: JSCPP;
  export default JSCPP;
  export = JSCPP;
}
