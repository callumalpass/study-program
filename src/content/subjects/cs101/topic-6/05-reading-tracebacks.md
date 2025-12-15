## Reading Tracebacks (Your Best Debugging Tool)

When an exception is unhandled, Python prints a traceback like:

```
Traceback (most recent call last):
  File "program.py", line 15, in <module>
    result = calculate(data)
  File "program.py", line 8, in calculate
    return process(items[0])
  File "program.py", line 3, in process
    return value / 0
ZeroDivisionError: division by zero
```

How to read it:

1. Start at the **bottom**: exception type + message.
2. The line above shows where it happened.
3. Above that is the chain of calls that led there.

Your job is to find the *first place your code goes wrong*, not just the last place it crashes.

---

## A Good Debugging Workflow

1. Reproduce the bug reliably.
2. Reduce the input to the smallest case that still breaks.
3. Read the traceback carefully.
4. Add prints (or use a debugger) to inspect key values.
5. Fix the root cause, then re-run.

