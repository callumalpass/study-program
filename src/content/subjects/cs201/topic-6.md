# Greedy Algorithms

## Introduction

Greedy algorithms are simple, intuitive, and efficient. They build a solution piece by piece, always choosing the next piece that offers the most immediate benefit. The hope is that by choosing the **local optimum** at each step, we will end up with the **global optimum**.

While DP explores all possibilities (smartly), Greedy explores only one path. This makes Greedy faster, but it doesn't always work.

## Learning Objectives

By the end of this topic, you will be able to:
1.  Understand the **Greedy Choice Property** and **Optimal Substructure**.
2.  Distinguish between problems solvable by Greedy vs. DP.
3.  Implement classic Greedy algorithms: **Activity Selection**, **Huffman Coding**, and **Fractional Knapsack**.
4.  Understand Minimum Spanning Trees (Prim's and Kruskal's).

## Core Concepts

### 1. The Greedy Choice Property

A global optimal solution can be arrived at by selecting a local optimal (greedy) choice. You don't need to check the alternatives.

### 2. Activity Selection Problem

**Problem:** Given $N$ activities with start and finish times, select the maximum number of activities that can be performed by a single person (activities cannot overlap).
**Greedy Strategy:** Always pick the activity that **finishes earliest**. This leaves the maximum remaining time for other activities.

### 3. Fractional Knapsack

**Problem:** You can take fractions of items (e.g., dust, liquids). Maximize value in a knapsack of capacity $W$.
**Greedy Strategy:** Calculate value/weight ratio for each item. Sort by ratio. Take as much of the highest ratio item as possible.
*Note: The 0/1 Knapsack (items are atomic) CANNOT be solved with Greedy. It requires DP.*

### 4. Huffman Coding

Used for lossless data compression.
**Strategy:** Create a binary tree where more frequent characters have shorter paths (fewer bits) and less frequent characters have longer paths. This uses a Priority Queue to repeatedly merge the two least frequent nodes.

### 5. Code Example: Activity Selection

```python
def activity_selection(start, finish):
    n = len(start)
    # Activities must be sorted by finish time
    # (Assuming inputs are sorted for brevity)
    
    i = 0 # First activity is always selected
    print(i, end=' ')
    
    for j in range(1, n):
        # If this activity starts after the last selected one finishes
        if start[j] >= finish[i]:
            print(j, end=' ')
            i = j
```

## Common Mistakes

1.  **Assuming Greedy Always Works:** This is the biggest trap. Greedy fails for Change Making (with arbitrary coins), 0/1 Knapsack, and Longest Path. Always look for a counter-example.
2.  **Wrong Greedy Criterion:** Sorting by start time vs finish time in Activity Selection. Sorting by value vs ratio in Knapsack. The choice of *what* to be greedy about is crucial.
3.  **Not Proving Correctness:** Unlike other algorithms, Greedy usually requires a mathematical proof (Exchange Argument) to be trusted.

## Best Practices

-   **Sort First:** Most greedy algorithms start by sorting the input (by finish time, by weight, by cost).
-   **Use Priority Queues:** Heaps are the data structure of choice for greedy algorithms (e.g., Prim's, Huffman, Dijkstra), allowing $O(\log n)$ retrieval of the "best" next option.
-   **Verify with DP:** If unsure, check if the problem can be framed as DP. If the Greedy Choice Property holds, simplify to Greedy.

## Summary

Greedy algorithms are fast ($O(n \log n)$ usually, due to sorting).
-   **Works for:** MST (Kruskal/Prim), Dijkstra (Shortest Path), Fractional Knapsack, Huffman.
-   **Fails for:** 0/1 Knapsack, Traveling Salesman, Change Making (general case).

When they work, they are the best solution. When they don't, they provide a fast approximation.
