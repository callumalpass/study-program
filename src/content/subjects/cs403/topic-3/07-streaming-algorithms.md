# Streaming Algorithms: Count-Min Sketch, Reservoir Sampling, Distinct Elements

## Introduction

Streaming algorithms process data that's too large to store in memory, using randomization and approximation. They're essential for big data, network monitoring, and real-time analytics.

## Streaming Model

**Input**: Stream of elements $a_1, a_2, \ldots$ (potentially infinite). **Constraints**: Single pass, sublinear space $O(\text{polylog } n)$. **Operations**: Update (process element), Query (answer question). **Goal**: Approximate answers with high probability.

## Count-Min Sketch

**Problem**: Estimate frequency of items in stream. **Structure**: $d \times w$ array with $d$ hash functions. **Update**: $CM[i][h_i(x)]$ += 1 for $i=1..d$. **Query**: $\hat{f}(x) = \min_i CM[i][h_i(x)]$. **Guarantee**: $f(x) \leq \hat{f}(x) \leq f(x) + \epsilon n$ with probability $1-\delta$ using space $O(\frac{1}{\epsilon} \log \frac{1}{\delta})$.

## Reservoir Sampling

**Problem**: Sample $k$ elements uniformly from stream of unknown length. **Algorithm**: Keep first $k$. For $i$-th element ($i>k$), include with probability $k/i$, replacing random element. **Correctness**: Each element has probability $k/n$ of being in final sample. **Applications**: Random sampling from databases, log analysis.

## Distinct Elements (Flajolet-Martin)

**Problem**: Count number of distinct elements. **Algorithm**: Hash each element, track minimum hash value $m$. **Estimate**: $\hat{d} \approx 1/m$. **Intuition**: If $d$ distinct elements, expect min hash $\approx 1/d$. **Accuracy**: Use $O(\log \log n)$ hash functions, take median. **Space**: $O(\log \log n \cdot \log n)$ bits.

## Applications

**Network monitoring**: Track flow statistics, detect DDoS attacks. **Database query optimization**: Estimate query cardinality. **Web analytics**: Count unique visitors. **Recommendation systems**: Item frequency tracking.

