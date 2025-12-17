import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs403-t2-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Vertex Cover 2-Approximation',
    difficulty: 3,
    description: 'Implement a 2-approximation algorithm for the minimum vertex cover problem using the edge selection strategy.',
    starterCode: `def vertex_cover_approximation(graph):
    """
    Find a 2-approximation for minimum vertex cover.

    Args:
        graph: Dictionary representing adjacency list.
               Example: {0: [1, 2], 1: [0, 2], 2: [0, 1]}

    Returns:
        set: A vertex cover (set of vertices covering all edges).
    """
    # Your code here
    pass`,
    solution: `def vertex_cover_approximation(graph):
    """
    Find a 2-approximation for minimum vertex cover.

    Args:
        graph: Dictionary representing adjacency list.

    Returns:
        set: A vertex cover (set of vertices covering all edges).
    """
    # Create a copy of edges to track uncovered edges
    edges = set()
    for u in graph:
        for v in graph[u]:
            if u < v:  # Avoid duplicates
                edges.add((u, v))

    cover = set()

    # Greedily select edges and add both endpoints
    while edges:
        # Pick any edge
        u, v = edges.pop()

        # Add both endpoints to cover
        cover.add(u)
        cover.add(v)

        # Remove all edges incident to u or v
        edges_to_remove = set()
        for edge in edges:
            if u in edge or v in edge:
                edges_to_remove.add(edge)

        edges -= edges_to_remove

    return cover`,
    testCases: [
      {
        input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}',
        isHidden: false,
        description: 'Triangle graph - any 2 vertices form a cover'
      },
      {
        input: 'graph = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}',
        isHidden: false,
        description: 'Path graph - should select vertices strategically'
      },
      {
        input: 'graph = {0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}',
        isHidden: false,
        description: 'Star graph - center vertex alone is optimal'
      }
    ],
    hints: [
      'Select an arbitrary uncovered edge and add both endpoints to the cover',
      'Remove all edges that are now covered by these vertices',
      'Repeat until no edges remain',
      'This guarantees a 2-approximation because optimal must include at least one endpoint of each selected edge'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Greedy Set Cover',
    difficulty: 3,
    description: 'Implement the greedy O(log n)-approximation algorithm for the set cover problem.',
    starterCode: `def greedy_set_cover(universe, sets):
    """
    Find an approximate set cover using the greedy algorithm.

    Args:
        universe: Set of elements to cover. Example: {1, 2, 3, 4, 5}
        sets: List of sets. Example: [{1, 2, 3}, {2, 4}, {3, 4}, {4, 5}]

    Returns:
        list: Indices of sets in the cover.
    """
    # Your code here
    pass`,
    solution: `def greedy_set_cover(universe, sets):
    """
    Find an approximate set cover using the greedy algorithm.

    Args:
        universe: Set of elements to cover.
        sets: List of sets.

    Returns:
        list: Indices of sets in the cover.
    """
    uncovered = set(universe)
    cover_indices = []

    while uncovered:
        # Find the set that covers the most uncovered elements
        best_set_idx = -1
        best_coverage = 0

        for i, s in enumerate(sets):
            coverage = len(s & uncovered)
            if coverage > best_coverage:
                best_coverage = coverage
                best_set_idx = i

        # Add the best set to the cover
        if best_set_idx == -1:
            break  # No more sets can cover remaining elements

        cover_indices.append(best_set_idx)
        uncovered -= sets[best_set_idx]

    return cover_indices`,
    testCases: [
      {
        input: 'universe = {1, 2, 3, 4, 5}, sets = [{1, 2, 3}, {2, 4}, {3, 4}, {4, 5}]',
        isHidden: false,
        description: 'Basic set cover instance'
      },
      {
        input: 'universe = {1, 2, 3}, sets = [{1}, {2}, {3}, {1, 2, 3}]',
        isHidden: false,
        description: 'Should prefer the largest set'
      },
      {
        input: 'universe = {1, 2, 3, 4}, sets = [{1, 2}, {2, 3}, {3, 4}]',
        isHidden: false,
        description: 'Need multiple sets to cover all elements'
      }
    ],
    hints: [
      'Greedily select the set that covers the most uncovered elements',
      'Remove covered elements from the universe',
      'Repeat until all elements are covered',
      'This provides an O(log n)-approximation where n is the size of the universe'
    ],
    language: 'python'
  }
];
