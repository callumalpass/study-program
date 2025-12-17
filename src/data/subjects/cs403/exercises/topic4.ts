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
  }
];
