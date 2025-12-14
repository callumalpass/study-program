import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs104-exercise-4',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'First Unique Character',
    difficulty: 2,
    description: 'Given a string, find the first non-repeating character and return its index. If all characters repeat, return -1. Use a hash table for an efficient solution.',
    language: 'python',
    starterCode: 'def first_unique_char(s):\n    # Your code here\n    pass',
    testCases: [
    ],
    hints: ['First pass: count the frequency of each character using a hash map', 'Second pass: find the first character with frequency 1', 'Python dictionaries maintain insertion order (Python 3.7+)'],
    solution: 'def first_unique_char(s):\n    char_count = {}\n    \n    # Count frequency of each character\n    for char in s:\n        char_count[char] = char_count.get(char, 0) + 1\n    \n    # Find first character with count 1\n    for i, char in enumerate(s):\n        if char_count[char] == 1:\n            return i\n    \n    return -1'
  },
  {
    id: 'cs104-t4-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Two Sum',
    difficulty: 1,
    description: 'Given an array of integers and a target sum, return indices of two numbers that add up to target. Use a hash map for O(n) solution.',
    starterCode: 'def two_sum(nums, target):\n    # Return [i, j] where nums[i] + nums[j] == target\n    pass\n\nprint(two_sum([2, 7, 11, 15], 9))',
    solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))',
    testCases: [
    ],
    hints: ['Store each number and its index in hash map', 'For each number, check if (target - number) exists in map'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Group Anagrams',
    difficulty: 2,
    description: 'Given an array of strings, group the anagrams together. Two strings are anagrams if they contain the same characters.',
    starterCode: 'def group_anagrams(strs):\n    # Return list of lists grouping anagrams\n    pass\n\nprint(group_anagrams(["eat","tea","tan","ate","nat","bat"]))',
    solution: 'def group_anagrams(strs):\n    groups = {}\n    for s in strs:\n        key = tuple(sorted(s))\n        if key not in groups:\n            groups[key] = []\n        groups[key].append(s)\n    return list(groups.values())\n\nprint(group_anagrams(["eat","tea","tan","ate","nat","bat"]))',
    testCases: [
    ],
    hints: ['Anagrams have the same sorted character sequence', 'Use sorted string as hash key'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Implement Hash Map',
    difficulty: 3,
    description: 'Implement a basic hash map with put, get, and remove operations. Handle collisions using chaining.',
    starterCode: 'class HashMap:\n    def __init__(self, size=1000):\n        self.size = size\n        self.buckets = [[] for _ in range(size)]\n    \n    def _hash(self, key):\n        return hash(key) % self.size\n    \n    def put(self, key, value):\n        pass\n    \n    def get(self, key):\n        # Return None if not found\n        pass\n    \n    def remove(self, key):\n        pass',
    solution: 'class HashMap:\n    def __init__(self, size=1000):\n        self.size = size\n        self.buckets = [[] for _ in range(size)]\n    \n    def _hash(self, key):\n        return hash(key) % self.size\n    \n    def put(self, key, value):\n        bucket_idx = self._hash(key)\n        bucket = self.buckets[bucket_idx]\n        for i, (k, v) in enumerate(bucket):\n            if k == key:\n                bucket[i] = (key, value)\n                return\n        bucket.append((key, value))\n    \n    def get(self, key):\n        bucket_idx = self._hash(key)\n        bucket = self.buckets[bucket_idx]\n        for k, v in bucket:\n            if k == key:\n                return v\n        return None\n    \n    def remove(self, key):\n        bucket_idx = self._hash(key)\n        bucket = self.buckets[bucket_idx]\n        for i, (k, v) in enumerate(bucket):\n            if k == key:\n                del bucket[i]\n                return',
    testCases: [
    ],
    hints: ['Each bucket is a list of (key, value) pairs', 'Check for existing key before inserting'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Subarray Sum Equals K',
    difficulty: 3,
    description: 'Given an array and integer k, find the total number of continuous subarrays whose sum equals k.',
    starterCode: 'def subarray_sum(nums, k):\n    # Return count of subarrays with sum k\n    pass\n\nprint(subarray_sum([1, 1, 1], 2))',
    solution: 'def subarray_sum(nums, k):\n    count = 0\n    prefix_sum = 0\n    sum_counts = {0: 1}  # sum -> count of occurrences\n    \n    for num in nums:\n        prefix_sum += num\n        if prefix_sum - k in sum_counts:\n            count += sum_counts[prefix_sum - k]\n        sum_counts[prefix_sum] = sum_counts.get(prefix_sum, 0) + 1\n    \n    return count\n\nprint(subarray_sum([1, 1, 1], 2))',
    testCases: [
    ],
    hints: ['Use prefix sum technique', 'If prefix[j] - prefix[i] = k, subarray i+1 to j sums to k', 'Store count of each prefix sum in hash map'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Longest Consecutive Sequence',
    difficulty: 4,
    description: 'Given an unsorted array, find the length of the longest consecutive elements sequence. Must run in O(n) time.',
    starterCode: 'def longest_consecutive(nums):\n    # Return length of longest consecutive sequence\n    pass\n\nprint(longest_consecutive([100, 4, 200, 1, 3, 2]))',
    solution: 'def longest_consecutive(nums):\n    num_set = set(nums)\n    longest = 0\n    \n    for num in num_set:\n        # Only start counting from sequence start\n        if num - 1 not in num_set:\n            current = num\n            length = 1\n            \n            while current + 1 in num_set:\n                current += 1\n                length += 1\n            \n            longest = max(longest, length)\n    \n    return longest\n\nprint(longest_consecutive([100, 4, 200, 1, 3, 2]))',
    testCases: [
    ],
    hints: ['Convert to set for O(1) lookup', 'Only start counting when num-1 is not in set', 'This ensures each number is processed at most twice'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Contains Duplicate II',
    difficulty: 2,
    description: 'Given an array and integer k, check if there are two distinct indices i and j such that nums[i] == nums[j] and |i - j| <= k.',
    starterCode: 'def contains_nearby_duplicate(nums, k):\n    pass\n\nprint(contains_nearby_duplicate([1, 2, 3, 1], 3))\nprint(contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2))',
    solution: 'def contains_nearby_duplicate(nums, k):\n    last_seen = {}\n    for i, num in enumerate(nums):\n        if num in last_seen and i - last_seen[num] <= k:\n            return True\n        last_seen[num] = i\n    return False\n\nprint(contains_nearby_duplicate([1, 2, 3, 1], 3))\nprint(contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2))',
    testCases: [
    ],
    hints: ['Store last seen index of each number', 'Check distance when duplicate found'],
    language: 'python'
  },
  {
    id: 'cs104-t4-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Design Twitter',
    difficulty: 5,
    description: 'Design a simplified Twitter with postTweet, getNewsFeed (10 most recent from followed users), follow, and unfollow.',
    starterCode: 'class Twitter:\n    def __init__(self):\n        pass\n    \n    def post_tweet(self, user_id, tweet_id):\n        pass\n    \n    def get_news_feed(self, user_id):\n        # Return 10 most recent tweet IDs\n        pass\n    \n    def follow(self, follower_id, followee_id):\n        pass\n    \n    def unfollow(self, follower_id, followee_id):\n        pass',
    solution: 'import heapq\nfrom collections import defaultdict\n\nclass Twitter:\n    def __init__(self):\n        self.time = 0\n        self.tweets = defaultdict(list)  # user_id -> [(time, tweet_id)]\n        self.following = defaultdict(set)  # user_id -> set of followed user_ids\n    \n    def post_tweet(self, user_id, tweet_id):\n        self.tweets[user_id].append((self.time, tweet_id))\n        self.time += 1\n    \n    def get_news_feed(self, user_id):\n        # Get tweets from user and all followed users\n        users = self.following[user_id] | {user_id}\n        heap = []\n        \n        for uid in users:\n            for tweet in self.tweets[uid]:\n                heapq.heappush(heap, (-tweet[0], tweet[1]))\n        \n        feed = []\n        while heap and len(feed) < 10:\n            feed.append(heapq.heappop(heap)[1])\n        return feed\n    \n    def follow(self, follower_id, followee_id):\n        if follower_id != followee_id:\n            self.following[follower_id].add(followee_id)\n    \n    def unfollow(self, follower_id, followee_id):\n        self.following[follower_id].discard(followee_id)',
    testCases: [
    ],
    hints: ['Use timestamp for ordering tweets', 'Store following as a set per user', 'Use heap to get top 10 most recent'],
    language: 'python'
  }
];
