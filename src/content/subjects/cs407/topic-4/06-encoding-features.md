---
title: "Encoding Features"
description: "Advanced feature encoding techniques"
---

# Encoding Features

Advanced encoding preserves information while making categorical data numerical.

```python
import pandas as pd
import numpy as np
from category_encoders import TargetEncoder, WOEEncoder

df = pd.DataFrame({
    'category': np.random.choice(['A', 'B', 'C'], 100),
    'target': np.random.choice([0, 1], 100)
})

# Target encoding
te = TargetEncoder()
df['category_target_enc'] = te.fit_transform(df['category'], df['target'])

# Frequency encoding
freq_map = df['category'].value_counts().to_dict()
df['category_freq_enc'] = df['category'].map(freq_map)

print("Encoding Examples:")
print(df.head(10))
```

Methods: target encoding, frequency, WOE, binary, hash encoding.