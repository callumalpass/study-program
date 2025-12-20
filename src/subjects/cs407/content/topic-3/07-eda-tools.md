---
title: "EDA Tools and Libraries"
description: "Tools and libraries for exploratory data analysis"
---

# EDA Tools and Libraries

Modern EDA leverages powerful libraries for efficient analysis and visualization.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Pandas Profiling (conceptual)
# from pandas_profiling import ProfileReport
# profile = ProfileReport(df, title="EDA Report")
# profile.to_file("report.html")

# Seaborn for quick visualization
tips = sns.load_dataset('tips')

# Pairplot
# sns.pairplot(tips, hue='sex')

# Correlation heatmap
print("Correlation Matrix:")
print(tips.corr(numeric_only=True))

# Distribution plot
print("\nSummary Statistics:")
print(tips['total_bill'].describe())
```

Tools: pandas, seaborn, matplotlib, plotly, pandas-profiling, sweetviz.