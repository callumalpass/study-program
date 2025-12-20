import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs403-t4-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'LRU Paging Algorithm',
    difficulty: 3,
    description: 'Implement the Least Recently Used (LRU) paging algorithm, which is k-competitive for online paging.',
    starterCode: `def lru_paging(page_requests, cache_size):
    """
    Simulate LRU paging algorithm.

    Args:
        page_requests: List of page requests.
        cache_size: Size of the cache (number of pages that can be held).

    Returns:
        int: Number of page faults.
    """
    # Your code here
    pass`,
    solution: `def lru_paging(page_requests, cache_size):
    """
    Simulate LRU paging algorithm.

    Args:
        page_requests: List of page requests.
        cache_size: Size of the cache (number of pages that can be held).

    Returns:
        int: Number of page faults.
    """
    cache = []
    page_faults = 0

    for page in page_requests:
        if page in cache:
            # Page hit - move to end (most recently used)
            cache.remove(page)
            cache.append(page)
        else:
            # Page fault
            page_faults += 1

            if len(cache) >= cache_size:
                # Cache is full - remove least recently used (first element)
                cache.pop(0)

            # Add new page (most recently used)
            cache.append(page)

    return page_faults`,
    testCases: [
      {
        input: 'page_requests = [1, 2, 3, 1, 4, 5], cache_size = 3',
        isHidden: false,
        description: 'Basic LRU test'
      },
      {
        input: 'page_requests = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], cache_size = 4',
        isHidden: false,
        description: 'Longer sequence with repeated accesses'
      },
      {
        input: 'page_requests = [1, 1, 1, 1], cache_size = 1',
        isHidden: false,
        description: 'All requests to same page'
      }
    ],
    hints: [
      'Maintain a cache of recently used pages',
      'On a page hit, move the page to the end (most recently used position)',
      'On a page fault, if cache is full, remove the first element (least recently used)',
      'Add the new page at the end'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Ski Rental Problem',
    difficulty: 2,
    description: 'Solve the ski rental problem: rent skis for $1/day or buy for $B. Determine the competitive ratio of the strategy "rent for B days, then buy".',
    starterCode: `def ski_rental_cost(num_days, buy_price, strategy='break_even'):
    """
    Calculate cost for ski rental problem.

    Args:
        num_days: Number of days you will ski.
        buy_price: Price to buy skis.
        strategy: 'break_even' (rent for buy_price days then buy) or 'always_rent'

    Returns:
        int: Total cost.
    """
    # Your code here
    pass`,
    solution: `def ski_rental_cost(num_days, buy_price, strategy='break_even'):
    """
    Calculate cost for ski rental problem.

    Args:
        num_days: Number of days you will ski.
        buy_price: Price to buy skis.
        strategy: 'break_even' (rent for buy_price days then buy) or 'always_rent'

    Returns:
        int: Total cost.
    """
    if strategy == 'always_rent':
        return num_days

    elif strategy == 'break_even':
        # Rent for buy_price days, then buy if needed
        if num_days <= buy_price:
            return num_days
        else:
            # Rented for buy_price days, then bought
            return buy_price + buy_price

    elif strategy == 'always_buy':
        return buy_price

    return 0`,
    testCases: [
      {
        input: 'num_days = 5, buy_price = 10, strategy = "break_even"',
        isHidden: false,
        description: 'Ski for fewer days than buy price - should rent'
      },
      {
        input: 'num_days = 15, buy_price = 10, strategy = "break_even"',
        isHidden: false,
        description: 'Ski for more days than buy price - rented 10 days then bought'
      },
      {
        input: 'num_days = 100, buy_price = 20, strategy = "always_rent"',
        isHidden: false,
        description: 'Always rent strategy - expensive for many days'
      }
    ],
    hints: [
      'The break-even strategy: rent for B days, then buy on day B+1 if needed',
      'If you ski for ≤ B days, total cost is the number of days',
      'If you ski for > B days, total cost is B (rental) + B (purchase) = 2B',
      'This strategy is 2-competitive (at most twice the optimal cost)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'FIFO Paging Algorithm',
    difficulty: 2,
    description: 'Implement First-In-First-Out (FIFO) paging algorithm and count page faults.',
    starterCode: `def fifo_paging(page_requests, cache_size):
    """
    Simulate FIFO paging algorithm.

    Args:
        page_requests: List of page requests.
        cache_size: Size of the cache.

    Returns:
        int: Number of page faults.
    """
    # Your code here
    pass`,
    solution: `def fifo_paging(page_requests, cache_size):
    """
    Simulate FIFO paging algorithm.

    Args:
        page_requests: List of page requests.
        cache_size: Size of the cache.

    Returns:
        int: Number of page faults.
    """
    cache = []
    page_faults = 0

    for page in page_requests:
        if page not in cache:
            # Page fault
            page_faults += 1

            if len(cache) >= cache_size:
                # Remove first page (FIFO)
                cache.pop(0)

            cache.append(page)

    return page_faults`,
    testCases: [
      {
        input: 'page_requests = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3], cache_size = 3',
        isHidden: false,
        description: 'Standard FIFO test case'
      },
      {
        input: 'page_requests = [1, 2, 3, 1, 4, 5], cache_size = 3',
        isHidden: false,
        description: 'Test with repeated access'
      },
      {
        input: 'page_requests = [7, 0, 1, 2, 0, 3, 0, 4], cache_size = 2',
        isHidden: false,
        description: 'Small cache size'
      }
    ],
    hints: [
      'Maintain a queue of pages in cache',
      'On page hit, do nothing (FIFO does not update order)',
      'On page fault, remove first page if cache is full',
      'FIFO can suffer from Belady\'s anomaly',
      'Simple but not optimal in competitive ratio'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Competitive Analysis',
    difficulty: 3,
    description: 'Implement a function to compute competitive ratio for an online algorithm given cost sequences.',
    starterCode: `def compute_competitive_ratio(online_costs, offline_costs):
    """
    Compute competitive ratio of an online algorithm.

    Args:
        online_costs: List of costs incurred by online algorithm on different inputs.
        offline_costs: List of costs incurred by optimal offline algorithm.

    Returns:
        float: Competitive ratio (max ratio over all inputs).
    """
    # Your code here
    pass`,
    solution: `def compute_competitive_ratio(online_costs, offline_costs):
    """
    Compute competitive ratio of an online algorithm.

    Args:
        online_costs: List of costs incurred by online algorithm on different inputs.
        offline_costs: List of costs incurred by optimal offline algorithm.

    Returns:
        float: Competitive ratio (max ratio over all inputs).
    """
    if len(online_costs) != len(offline_costs):
        raise ValueError("Cost lists must have same length")

    max_ratio = 0

    for online, offline in zip(online_costs, offline_costs):
        if offline == 0:
            # Avoid division by zero
            if online > 0:
                return float('inf')
            continue

        ratio = online / offline
        max_ratio = max(max_ratio, ratio)

    return max_ratio`,
    testCases: [
      {
        input: 'online_costs = [10, 20, 30], offline_costs = [5, 10, 10]',
        isHidden: false,
        description: 'Algorithm with 3-competitive ratio'
      },
      {
        input: 'online_costs = [100, 200], offline_costs = [50, 100]',
        isHidden: false,
        description: 'Consistent 2-competitive ratio'
      },
      {
        input: 'online_costs = [5, 10, 15], offline_costs = [5, 5, 5]',
        isHidden: false,
        description: 'Variable competitive ratios'
      }
    ],
    hints: [
      'Competitive ratio = max(ALG(I) / OPT(I)) over all inputs I',
      'ALG is online algorithm cost, OPT is optimal offline cost',
      'Compute ratio for each input and take maximum',
      'Handle edge case where offline cost is 0',
      'Lower competitive ratio is better'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'First-Fit Bin Packing',
    difficulty: 3,
    description: 'Implement First-Fit algorithm for online bin packing problem.',
    starterCode: `def first_fit_bin_packing(items, bin_capacity):
    """
    Pack items using First-Fit algorithm.

    Args:
        items: List of item sizes (0 < size <= bin_capacity).
        bin_capacity: Capacity of each bin.

    Returns:
        list: List of bins, where each bin is a list of item sizes.
    """
    # Your code here
    pass`,
    solution: `def first_fit_bin_packing(items, bin_capacity):
    """
    Pack items using First-Fit algorithm.

    Args:
        items: List of item sizes (0 < size <= bin_capacity).
        bin_capacity: Capacity of each bin.

    Returns:
        list: List of bins, where each bin is a list of item sizes.
    """
    bins = []
    bin_remaining = []

    for item in items:
        # Find first bin that fits
        placed = False
        for i in range(len(bins)):
            if bin_remaining[i] >= item:
                bins[i].append(item)
                bin_remaining[i] -= item
                placed = True
                break

        if not placed:
            # Create new bin
            bins.append([item])
            bin_remaining.append(bin_capacity - item)

    return bins`,
    testCases: [
      {
        input: 'items = [0.3, 0.5, 0.2, 0.7, 0.4], bin_capacity = 1.0',
        isHidden: false,
        description: 'Basic bin packing with fractional sizes'
      },
      {
        input: 'items = [5, 3, 4, 2, 6, 1], bin_capacity = 10',
        isHidden: false,
        description: 'Integer bin packing'
      },
      {
        input: 'items = [0.6, 0.6, 0.6, 0.6], bin_capacity = 1.0',
        isHidden: false,
        description: 'Items requiring individual bins'
      }
    ],
    hints: [
      'Maintain list of bins and their remaining capacity',
      'For each item, scan bins in order until finding one that fits',
      'If no bin fits, create a new bin',
      'First-Fit is 2-competitive for online bin packing',
      'Can be improved to 1.7-competitive with First-Fit-Decreasing (offline)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Best-Fit Bin Packing',
    difficulty: 3,
    description: 'Implement Best-Fit algorithm for online bin packing (place in bin with least remaining space).',
    starterCode: `def best_fit_bin_packing(items, bin_capacity):
    """
    Pack items using Best-Fit algorithm.

    Args:
        items: List of item sizes.
        bin_capacity: Capacity of each bin.

    Returns:
        list: List of bins, where each bin is a list of item sizes.
    """
    # Your code here
    pass`,
    solution: `def best_fit_bin_packing(items, bin_capacity):
    """
    Pack items using Best-Fit algorithm.

    Args:
        items: List of item sizes.
        bin_capacity: Capacity of each bin.

    Returns:
        list: List of bins, where each bin is a list of item sizes.
    """
    bins = []
    bin_remaining = []

    for item in items:
        # Find bin with minimum remaining space that fits
        best_bin = -1
        min_remaining = bin_capacity + 1

        for i in range(len(bins)):
            if bin_remaining[i] >= item and bin_remaining[i] < min_remaining:
                best_bin = i
                min_remaining = bin_remaining[i]

        if best_bin != -1:
            # Place in best bin
            bins[best_bin].append(item)
            bin_remaining[best_bin] -= item
        else:
            # Create new bin
            bins.append([item])
            bin_remaining.append(bin_capacity - item)

    return bins`,
    testCases: [
      {
        input: 'items = [0.3, 0.5, 0.2, 0.7, 0.4], bin_capacity = 1.0',
        isHidden: false,
        description: 'Best-Fit should pack more efficiently than First-Fit'
      },
      {
        input: 'items = [4, 8, 1, 4, 2, 1], bin_capacity = 10',
        isHidden: false,
        description: 'Integer sizes with Best-Fit'
      },
      {
        input: 'items = [0.25, 0.5, 0.25, 0.75, 0.25], bin_capacity = 1.0',
        isHidden: false,
        description: 'Items that can be packed together'
      }
    ],
    hints: [
      'For each item, find bin with minimum remaining space that still fits',
      'Best-Fit tries to minimize wasted space',
      'Scan all bins to find best fit (not just first fit)',
      'Also 2-competitive but often better in practice',
      'Can use priority queue for better performance'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Online Load Balancing',
    difficulty: 3,
    description: 'Implement greedy load balancing algorithm that assigns each job to the machine with minimum current load.',
    starterCode: `def greedy_load_balancing(jobs, num_machines):
    """
    Assign jobs to machines using greedy load balancing.

    Args:
        jobs: List of job processing times.
        num_machines: Number of machines available.

    Returns:
        tuple: (machine_loads dict, makespan)
    """
    # Your code here
    pass`,
    solution: `def greedy_load_balancing(jobs, num_machines):
    """
    Assign jobs to machines using greedy load balancing.

    Args:
        jobs: List of job processing times.
        num_machines: Number of machines available.

    Returns:
        tuple: (machine_loads dict, makespan)
    """
    machine_loads = {i: [] for i in range(num_machines)}
    machine_times = [0] * num_machines

    for job in jobs:
        # Find machine with minimum load
        min_machine = min(range(num_machines), key=lambda i: machine_times[i])

        # Assign job to that machine
        machine_loads[min_machine].append(job)
        machine_times[min_machine] += job

    makespan = max(machine_times)

    return machine_loads, makespan`,
    testCases: [
      {
        input: 'jobs = [2, 3, 4, 6, 2, 2], num_machines = 3',
        isHidden: false,
        description: 'Basic load balancing'
      },
      {
        input: 'jobs = [10, 1, 1, 1, 1, 1], num_machines = 2',
        isHidden: false,
        description: 'Large job followed by small jobs'
      },
      {
        input: 'jobs = [5, 5, 5, 5, 5, 5], num_machines = 3',
        isHidden: false,
        description: 'Equal sized jobs'
      }
    ],
    hints: [
      'Assign each job to machine with current minimum load',
      'This is a greedy online algorithm',
      'Competitive ratio is 2 - 1/m where m is number of machines',
      'Track total load on each machine',
      'Makespan is the maximum load across all machines'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Secretary Problem',
    difficulty: 4,
    description: 'Implement the optimal algorithm for the secretary problem (select best candidate from online sequence).',
    starterCode: `import random

def secretary_problem(candidates, strategy='optimal'):
    """
    Solve secretary problem using 1/e strategy.

    Args:
        candidates: List of candidate values (higher is better).
        strategy: 'optimal' uses 1/e rule, 'random' picks randomly.

    Returns:
        tuple: (selected_value, selected_index)
    """
    # Your code here
    pass`,
    solution: `import random

def secretary_problem(candidates, strategy='optimal'):
    """
    Solve secretary problem using 1/e strategy.

    Args:
        candidates: List of candidate values (higher is better).
        strategy: 'optimal' uses 1/e rule, 'random' picks randomly.

    Returns:
        tuple: (selected_value, selected_index)
    """
    n = len(candidates)

    if strategy == 'random':
        idx = random.randint(0, n - 1)
        return candidates[idx], idx

    elif strategy == 'optimal':
        # Skip first n/e candidates, then select first one better than all skipped
        skip = int(n / 2.718)  # approximately n/e

        # Find max in first skip candidates
        max_in_skip = max(candidates[:skip]) if skip > 0 else float('-inf')

        # Find first candidate after skip better than max_in_skip
        for i in range(skip, n):
            if candidates[i] > max_in_skip:
                return candidates[i], i

        # If no such candidate found, return last one
        return candidates[-1], n - 1

    return None, -1`,
    testCases: [
      {
        input: 'candidates = [3, 7, 2, 9, 4, 1, 8, 5], strategy = "optimal"',
        isHidden: false,
        description: 'Secretary problem with 8 candidates'
      },
      {
        input: 'candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], strategy = "optimal"',
        isHidden: false,
        description: 'Best candidate at the end'
      },
      {
        input: 'candidates = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], strategy = "optimal"',
        isHidden: false,
        description: 'Best candidate at the beginning'
      }
    ],
    hints: [
      'Skip first n/e candidates (approximately 37%)',
      'During skip phase, observe but do not select',
      'After skip phase, select first candidate better than all skipped',
      'This strategy succeeds with probability 1/e ≈ 37%',
      'Optimal for online selection without recall'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Online Bipartite Matching',
    difficulty: 4,
    description: 'Implement greedy algorithm for online bipartite matching with competitive ratio 1/2.',
    starterCode: `def online_bipartite_matching(online_vertices, offline_edges):
    """
    Online bipartite matching using greedy algorithm.

    Args:
        online_vertices: List of online vertices (arrive one at a time).
        offline_edges: Dict mapping each online vertex to list of offline neighbors.

    Returns:
        dict: Matching (maps online vertex to matched offline vertex or None).
    """
    # Your code here
    pass`,
    solution: `def online_bipartite_matching(online_vertices, offline_edges):
    """
    Online bipartite matching using greedy algorithm.

    Args:
        online_vertices: List of online vertices (arrive one at a time).
        offline_edges: Dict mapping each online vertex to list of offline neighbors.

    Returns:
        dict: Matching (maps online vertex to matched offline vertex or None).
    """
    matching = {}
    matched_offline = set()

    for online_v in online_vertices:
        # Try to match with any unmatched offline neighbor
        matched = False

        for offline_v in offline_edges.get(online_v, []):
            if offline_v not in matched_offline:
                # Match greedily
                matching[online_v] = offline_v
                matched_offline.add(offline_v)
                matched = True
                break

        if not matched:
            matching[online_v] = None

    return matching`,
    testCases: [
      {
        input: 'online_vertices = [1, 2, 3], offline_edges = {1: ["a", "b"], 2: ["a", "c"], 3: ["b", "c"]}',
        isHidden: false,
        description: 'Small bipartite graph'
      },
      {
        input: 'online_vertices = [1, 2, 3, 4], offline_edges = {1: ["a"], 2: ["a", "b"], 3: ["b"], 4: ["c"]}',
        isHidden: false,
        description: 'Graph with some vertices having limited choices'
      },
      {
        input: 'online_vertices = [1, 2], offline_edges = {1: ["a", "b", "c"], 2: ["a", "b", "c"]}',
        isHidden: false,
        description: 'Multiple matching options'
      }
    ],
    hints: [
      'Online vertices arrive one at a time',
      'Match each online vertex to any available offline neighbor',
      'Greedy matching cannot be undone',
      'Competitive ratio is 1/2 (at least half of optimal)',
      'Can be improved with randomized algorithms'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'k-Server Problem',
    difficulty: 5,
    description: 'Implement greedy algorithm for k-server problem (move nearest server to request).',
    starterCode: `def k_server_greedy(requests, server_positions, num_positions):
    """
    Simulate k-server problem using greedy (nearest server) algorithm.

    Args:
        requests: List of position requests.
        server_positions: Initial positions of k servers (list).
        num_positions: Number of positions in the metric space (0 to num_positions-1).

    Returns:
        tuple: (total_cost, final_server_positions)
    """
    # Your code here
    pass`,
    solution: `def k_server_greedy(requests, server_positions, num_positions):
    """
    Simulate k-server problem using greedy (nearest server) algorithm.

    Args:
        requests: List of position requests.
        server_positions: Initial positions of k servers (list).
        num_positions: Number of positions in the metric space (0 to num_positions-1).

    Returns:
        tuple: (total_cost, final_server_positions)
    """
    servers = server_positions[:]  # Copy
    total_cost = 0

    for request in requests:
        # Check if any server is already at request position
        if request in servers:
            continue

        # Find nearest server to request
        min_dist = float('inf')
        min_server_idx = -1

        for i, server_pos in enumerate(servers):
            dist = abs(request - server_pos)
            if dist < min_dist:
                min_dist = dist
                min_server_idx = i

        # Move nearest server to request
        total_cost += min_dist
        servers[min_server_idx] = request

    return total_cost, servers`,
    testCases: [
      {
        input: 'requests = [3, 7, 2, 9], server_positions = [0, 10], num_positions = 11',
        isHidden: false,
        description: '2 servers on line segment'
      },
      {
        input: 'requests = [5, 5, 5], server_positions = [0, 10, 20], num_positions = 21',
        isHidden: false,
        description: 'Repeated requests'
      },
      {
        input: 'requests = [1, 2, 3, 4, 5], server_positions = [0], num_positions = 10',
        isHidden: false,
        description: 'Single server'
      }
    ],
    hints: [
      'k servers can serve requests at different positions',
      'When request arrives, move nearest server to that position',
      'Cost is distance moved',
      'Greedy algorithm is k-competitive',
      'Optimal online algorithm for k-server is also k-competitive'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Online Knapsack',
    difficulty: 4,
    description: 'Implement threshold algorithm for online knapsack problem.',
    starterCode: `def online_knapsack(items, capacity, threshold_ratio=0.5):
    """
    Online knapsack using threshold algorithm.

    Args:
        items: List of (value, weight) tuples arriving online.
        capacity: Knapsack capacity.
        threshold_ratio: Accept items with value/weight >= threshold_ratio * max_density.

    Returns:
        tuple: (selected_items, total_value, total_weight)
    """
    # Your code here
    pass`,
    solution: `def online_knapsack(items, capacity, threshold_ratio=0.5):
    """
    Online knapsack using threshold algorithm.

    Args:
        items: List of (value, weight) tuples arriving online.
        capacity: Knapsack capacity.
        threshold_ratio: Accept items with value/weight >= threshold_ratio * max_density.

    Returns:
        tuple: (selected_items, total_value, total_weight)
    """
    # Estimate max density (in practice, would need to guess)
    max_density = max(v / w for v, w in items) if items else 1
    threshold = threshold_ratio * max_density

    selected = []
    total_value = 0
    total_weight = 0

    for value, weight in items:
        density = value / weight

        # Accept if density >= threshold and fits
        if density >= threshold and total_weight + weight <= capacity:
            selected.append((value, weight))
            total_value += value
            total_weight += weight

    return selected, total_value, total_weight`,
    testCases: [
      {
        input: 'items = [(60, 10), (100, 20), (120, 30)], capacity = 50, threshold_ratio = 0.5',
        isHidden: false,
        description: 'Basic online knapsack'
      },
      {
        input: 'items = [(10, 5), (40, 4), (30, 6), (50, 3)], capacity = 10, threshold_ratio = 0.6',
        isHidden: false,
        description: 'High threshold filters more items'
      },
      {
        input: 'items = [(25, 5), (25, 5), (25, 5), (25, 5)], capacity = 10, threshold_ratio = 0.5',
        isHidden: false,
        description: 'Equal density items'
      }
    ],
    hints: [
      'Cannot see future items in online setting',
      'Use threshold based on value-to-weight ratio',
      'Accept items with density above threshold if they fit',
      'Threshold needs to be set without knowing future items',
      'Competitive ratio depends on threshold choice'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Move-To-Front List',
    difficulty: 2,
    description: 'Implement Move-To-Front (MTF) heuristic for list accessing, which is 2-competitive.',
    starterCode: `def move_to_front(access_sequence, initial_list):
    """
    Simulate Move-To-Front list accessing.

    Args:
        access_sequence: List of elements to access.
        initial_list: Initial ordering of list elements.

    Returns:
        tuple: (total_cost, final_list)
    """
    # Your code here
    pass`,
    solution: `def move_to_front(access_sequence, initial_list):
    """
    Simulate Move-To-Front list accessing.

    Args:
        access_sequence: List of elements to access.
        initial_list: Initial ordering of list elements.

    Returns:
        tuple: (total_cost, final_list)
    """
    lst = initial_list[:]
    total_cost = 0

    for item in access_sequence:
        # Find item in list (cost is position + 1)
        position = lst.index(item)
        total_cost += position + 1

        # Move to front
        lst.pop(position)
        lst.insert(0, item)

    return total_cost, lst`,
    testCases: [
      {
        input: 'access_sequence = ["a", "b", "c", "a", "b", "a"], initial_list = ["a", "b", "c", "d"]',
        isHidden: false,
        description: 'Repeated accesses benefit from MTF'
      },
      {
        input: 'access_sequence = ["d", "c", "b", "a"], initial_list = ["a", "b", "c", "d"]',
        isHidden: false,
        description: 'Reverse order access'
      },
      {
        input: 'access_sequence = ["a", "a", "a"], initial_list = ["a", "b", "c"]',
        isHidden: false,
        description: 'Single element repeatedly'
      }
    ],
    hints: [
      'Cost to access element at position i is i',
      'After accessing, move element to front of list',
      'MTF is 2-competitive against any offline algorithm',
      'Works well for locality of reference',
      'No knowledge of future accesses needed'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Online Coloring',
    difficulty: 3,
    description: 'Implement First-Fit online graph coloring algorithm.',
    starterCode: `def online_coloring(vertices, edges):
    """
    Color graph vertices online using First-Fit coloring.

    Args:
        vertices: List of vertices arriving in order.
        edges: List of (u, v) edges (only edges between already-arrived vertices are known).

    Returns:
        dict: Mapping from vertices to colors.
    """
    # Your code here
    pass`,
    solution: `def online_coloring(vertices, edges):
    """
    Color graph vertices online using First-Fit coloring.

    Args:
        vertices: List of vertices arriving in order.
        edges: List of (u, v) edges (only edges between already-arrived vertices are known).

    Returns:
        dict: Mapping from vertices to colors.
    """
    colors = {}
    edge_set = set((min(u, v), max(u, v)) for u, v in edges)

    for vertex in vertices:
        # Find colors of already-colored neighbors
        neighbor_colors = set()

        for colored_vertex in colors:
            edge = (min(vertex, colored_vertex), max(vertex, colored_vertex))
            if edge in edge_set:
                neighbor_colors.add(colors[colored_vertex])

        # Assign first available color
        color = 0
        while color in neighbor_colors:
            color += 1

        colors[vertex] = color

    return colors`,
    testCases: [
      {
        input: 'vertices = [1, 2, 3], edges = [(1, 2), (2, 3), (1, 3)]',
        isHidden: false,
        description: 'Triangle graph - needs 3 colors'
      },
      {
        input: 'vertices = [1, 2, 3, 4], edges = [(1, 2), (2, 3), (3, 4), (4, 1)]',
        isHidden: false,
        description: 'Square graph - needs 2 colors'
      },
      {
        input: 'vertices = [1, 2, 3, 4, 5], edges = [(1, 2), (1, 3), (1, 4), (1, 5)]',
        isHidden: false,
        description: 'Star graph - needs 2 colors'
      }
    ],
    hints: [
      'Vertices arrive one at a time with edges to previous vertices',
      'Assign smallest color not used by neighbors',
      'Cannot change color of previously colored vertices',
      'First-Fit uses at most 2χ(G) - 1 colors where χ(G) is chromatic number',
      'Online coloring is harder than offline'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Weighted Caching',
    difficulty: 4,
    description: 'Implement greedy algorithm for weighted paging where pages have different costs.',
    starterCode: `def weighted_caching(requests, costs, cache_size):
    """
    Weighted paging: evict page with maximum cost when cache is full.

    Args:
        requests: List of (page, cost) tuples.
        costs: Dictionary mapping pages to their fetch costs.
        cache_size: Size of cache.

    Returns:
        tuple: (total_cost, num_faults)
    """
    # Your code here
    pass`,
    solution: `def weighted_caching(requests, costs, cache_size):
    """
    Weighted paging: evict page with maximum cost when cache is full.

    Args:
        requests: List of page requests.
        costs: Dictionary mapping pages to their fetch costs.
        cache_size: Size of cache.

    Returns:
        tuple: (total_cost, num_faults)
    """
    cache = set()
    total_cost = 0
    num_faults = 0

    for page in requests:
        if page not in cache:
            # Page fault
            num_faults += 1
            total_cost += costs[page]

            if len(cache) >= cache_size:
                # Evict page in cache with maximum cost
                max_cost_page = max(cache, key=lambda p: costs[p])
                cache.remove(max_cost_page)

            cache.add(page)

    return total_cost, num_faults`,
    testCases: [
      {
        input: 'requests = [1, 2, 3, 4, 1, 2], costs = {1: 1, 2: 2, 3: 3, 4: 4}, cache_size = 2',
        isHidden: false,
        description: 'Pages with different costs'
      },
      {
        input: 'requests = [1, 1, 2, 2, 3, 3], costs = {1: 5, 2: 1, 3: 1}, cache_size = 2',
        isHidden: false,
        description: 'Expensive page accessed frequently'
      },
      {
        input: 'requests = [1, 2, 3, 1], costs = {1: 1, 2: 2, 3: 3}, cache_size = 2',
        isHidden: false,
        description: 'Evict expensive pages first'
      }
    ],
    hints: [
      'When cache is full, evict page with highest cost',
      'Intuition: expensive pages are more worth keeping in cache',
      'This is the greedy algorithm for weighted caching',
      'Cost to fetch page varies by page',
      'Track both total cost and number of faults'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'TCP Acknowledgment',
    difficulty: 3,
    description: 'Implement online algorithm for TCP acknowledgment problem (decide when to send ACKs).',
    starterCode: `def tcp_acknowledgment(packets, ack_cost, delay_cost, window_size):
    """
    Decide when to send acknowledgments for TCP packets.

    Args:
        packets: List of packet arrival times.
        ack_cost: Cost to send one acknowledgment.
        delay_cost: Cost per time unit per unacknowledged packet.
        window_size: Maximum unacknowledged packets before forced ACK.

    Returns:
        tuple: (ack_times, total_cost)
    """
    # Your code here
    pass`,
    solution: `def tcp_acknowledgment(packets, ack_cost, delay_cost, window_size):
    """
    Decide when to send acknowledgments for TCP packets.

    Args:
        packets: List of packet arrival times.
        ack_cost: Cost to send one acknowledgment.
        delay_cost: Cost per time unit per unacknowledged packet.
        window_size: Maximum unacknowledged packets before forced ACK.

    Returns:
        tuple: (ack_times, total_cost)
    """
    ack_times = []
    total_cost = 0
    unacked = []

    for i, arrival_time in enumerate(packets):
        unacked.append(arrival_time)

        # Send ACK if window is full
        if len(unacked) >= window_size:
            # Send acknowledgment now
            ack_times.append(arrival_time)
            total_cost += ack_cost

            # Add delay cost for all unacked packets
            for unacked_time in unacked:
                total_cost += delay_cost * (arrival_time - unacked_time)

            unacked = []

    # Acknowledge remaining packets at end
    if unacked:
        final_time = packets[-1]
        ack_times.append(final_time)
        total_cost += ack_cost

        for unacked_time in unacked:
            total_cost += delay_cost * (final_time - unacked_time)

    return ack_times, total_cost`,
    testCases: [
      {
        input: 'packets = [1, 2, 3, 4, 5], ack_cost = 5, delay_cost = 1, window_size = 3',
        isHidden: false,
        description: 'Trade-off between ACK cost and delay'
      },
      {
        input: 'packets = [1, 3, 5, 7, 9], ack_cost = 10, delay_cost = 2, window_size = 2',
        isHidden: false,
        description: 'High ACK cost encourages delaying'
      },
      {
        input: 'packets = [1, 2, 3], ack_cost = 1, delay_cost = 5, window_size = 5',
        isHidden: false,
        description: 'High delay cost encourages frequent ACKs'
      }
    ],
    hints: [
      'Balance cost of sending ACK vs cost of delaying',
      'Window size limits maximum unacknowledged packets',
      'Delay cost accumulates for each unacknowledged packet',
      'Must decide online when to send each ACK',
      'Simple strategy: send ACK when window is full'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t4-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Metrical Task Systems',
    difficulty: 5,
    description: 'Implement work function algorithm for metrical task systems.',
    starterCode: `def metrical_task_system(tasks, states, transition_costs, task_costs):
    """
    Solve metrical task system using greedy algorithm.

    Args:
        tasks: List of tasks arriving online.
        states: List of possible states.
        transition_costs: Dict mapping (state1, state2) to transition cost.
        task_costs: Dict mapping (task, state) to cost of serving task in that state.

    Returns:
        tuple: (state_sequence, total_cost)
    """
    # Your code here
    pass`,
    solution: `def metrical_task_system(tasks, states, transition_costs, task_costs):
    """
    Solve metrical task system using greedy algorithm.

    Args:
        tasks: List of tasks arriving online.
        states: List of possible states.
        transition_costs: Dict mapping (state1, state2) to transition cost.
        task_costs: Dict mapping (task, state) to cost of serving task in that state.

    Returns:
        tuple: (state_sequence, total_cost)
    """
    # Start at first state
    current_state = states[0]
    state_sequence = [current_state]
    total_cost = 0

    for task in tasks:
        # Find best state to serve this task
        best_state = current_state
        min_cost = task_costs.get((task, current_state), 0)

        for state in states:
            transition_cost = transition_costs.get((current_state, state), 0)
            task_cost = task_costs.get((task, state), 0)
            total = transition_cost + task_cost

            if total < min_cost + transition_costs.get((current_state, best_state), 0):
                best_state = state
                min_cost = task_cost

        # Transition to best state
        total_cost += transition_costs.get((current_state, best_state), 0)
        total_cost += task_costs.get((task, best_state), 0)

        current_state = best_state
        state_sequence.append(current_state)

    return state_sequence, total_cost`,
    testCases: [
      {
        input: 'tasks = [1, 2, 1], states = ["A", "B"], transition_costs = {("A", "B"): 2, ("B", "A"): 2, ("A", "A"): 0, ("B", "B"): 0}, task_costs = {(1, "A"): 1, (1, "B"): 5, (2, "A"): 5, (2, "B"): 1}',
        isHidden: false,
        description: 'Simple two-state system'
      },
      {
        input: 'tasks = [1, 1, 1], states = ["A", "B"], transition_costs = {("A", "B"): 10, ("B", "A"): 10, ("A", "A"): 0, ("B", "B"): 0}, task_costs = {(1, "A"): 1, (1, "B"): 2}',
        isHidden: false,
        description: 'High transition cost'
      },
      {
        input: 'tasks = [1, 2, 3], states = ["A", "B", "C"], transition_costs = {("A", "B"): 1, ("B", "C"): 1, ("A", "C"): 3, ("A", "A"): 0, ("B", "B"): 0, ("C", "C"): 0}, task_costs = {(1, "A"): 0, (2, "B"): 0, (3, "C"): 0}',
        isHidden: false,
        description: 'Three-state system with metric costs'
      }
    ],
    hints: [
      'MTS generalizes many online problems (paging, k-server, etc.)',
      'System can be in one of n states',
      'Must serve each task, possibly transitioning to new state',
      'Cost = transition cost + task service cost in chosen state',
      'Greedy: choose state that minimizes immediate cost',
      'Optimal online algorithm is 2n-1 competitive'
    ],
    language: 'python'
  }
];
