import { CodingExercise } from '../../../../core/types';

export const cs407Topic5Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-5-1',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Create a Simple Line Plot',
    description: 'Write a function that creates a line plot using matplotlib with given x and y data, title, and axis labels.',
    difficulty: 1,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_line_plot(x, y, title, xlabel, ylabel):
    # Create a line plot with the given parameters
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_line_plot(x, y, title, xlabel, ylabel):
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    return fig`,
    testCases: [
      {
        input: 'x=[1, 2, 3, 4], y=[1, 4, 9, 16], title="Squares", xlabel="Number", ylabel="Square"',
        expectedOutput: 'Figure with line plot',
        isHidden: false,
        description: 'Basic line plot'
      },
      {
        input: 'x=[0, 1, 2], y=[0, 1, 0], title="Triangle Wave", xlabel="Time", ylabel="Amplitude"',
        expectedOutput: 'Figure with triangle wave',
        isHidden: false,
        description: 'Triangle wave plot'
      }
    ],
    hints: [
      'Use plt.subplots() to create figure and axes',
      'Use ax.plot(x, y) to create the line plot',
      'Use ax.set_title(), ax.set_xlabel(), ax.set_ylabel()',
      'Return the figure object'
    ]
  },
  {
    id: 'cs407-ex-5-2',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Create a Bar Chart',
    description: 'Write a function that creates a bar chart showing categorical data with custom colors.',
    difficulty: 1,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_bar_chart(categories, values, title, color='blue'):
    # Create a bar chart with the given parameters
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_bar_chart(categories, values, title, color='blue'):
    fig, ax = plt.subplots()
    ax.bar(categories, values, color=color)
    ax.set_title(title)
    ax.set_xlabel('Category')
    ax.set_ylabel('Value')
    return fig`,
    testCases: [
      {
        input: 'categories=["A", "B", "C"], values=[10, 20, 15], title="Sales", color="green"',
        expectedOutput: 'Figure with green bar chart',
        isHidden: false,
        description: 'Basic bar chart'
      },
      {
        input: 'categories=["Q1", "Q2", "Q3", "Q4"], values=[100, 120, 110, 130], title="Quarterly Revenue"',
        expectedOutput: 'Figure with blue bar chart',
        isHidden: false,
        description: 'Quarterly data'
      }
    ],
    hints: [
      'Use plt.subplots() to create figure and axes',
      'Use ax.bar(categories, values, color=color)',
      'Set title and axis labels',
      'Return the figure object'
    ]
  },
  {
    id: 'cs407-ex-5-3',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Create a Scatter Plot',
    description: 'Write a function that creates a scatter plot with different marker sizes based on a third variable.',
    difficulty: 2,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_scatter_plot(x, y, sizes, title):
    # Create a scatter plot where marker size varies
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_scatter_plot(x, y, sizes, title):
    fig, ax = plt.subplots()
    ax.scatter(x, y, s=sizes, alpha=0.6)
    ax.set_title(title)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    return fig`,
    testCases: [
      {
        input: 'x=[1, 2, 3, 4], y=[2, 4, 6, 8], sizes=[50, 100, 150, 200], title="Variable Size Scatter"',
        expectedOutput: 'Figure with scatter plot',
        isHidden: false,
        description: 'Scatter with varying sizes'
      },
      {
        input: 'x=[1, 1, 2, 2], y=[1, 2, 1, 2], sizes=[100, 100, 100, 100], title="Grid Points"',
        expectedOutput: 'Figure with grid scatter',
        isHidden: false,
        description: 'Grid pattern'
      }
    ],
    hints: [
      'Use ax.scatter(x, y, s=sizes) for scatter plot',
      'The s parameter controls marker size',
      'Add alpha=0.6 for transparency',
      'Set title and axis labels'
    ]
  },
  {
    id: 'cs407-ex-5-4',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Create a Histogram',
    description: 'Write a function that creates a histogram with a specified number of bins.',
    difficulty: 2,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_histogram(data, bins, title):
    # Create a histogram with the given number of bins
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_histogram(data, bins, title):
    fig, ax = plt.subplots()
    ax.hist(data, bins=bins, edgecolor='black', alpha=0.7)
    ax.set_title(title)
    ax.set_xlabel('Value')
    ax.set_ylabel('Frequency')
    return fig`,
    testCases: [
      {
        input: 'data=[1, 2, 2, 3, 3, 3, 4, 4, 5], bins=5, title="Distribution"',
        expectedOutput: 'Figure with histogram',
        isHidden: false,
        description: 'Basic histogram'
      },
      {
        input: 'data=[10, 20, 20, 30, 30, 30], bins=3, title="Grouped Data"',
        expectedOutput: 'Figure with 3-bin histogram',
        isHidden: false,
        description: 'Fewer bins'
      }
    ],
    hints: [
      'Use ax.hist(data, bins=bins)',
      'Add edgecolor="black" for bin borders',
      'Set alpha=0.7 for transparency',
      'Label axes appropriately'
    ]
  },
  {
    id: 'cs407-ex-5-5',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Create Subplots',
    description: 'Write a function that creates a 2x2 grid of subplots with different plot types.',
    difficulty: 2,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_subplot_grid(data):
    # data is a dict with keys 'line', 'bar', 'scatter', 'hist'
    # Create 2x2 subplots showing all four plot types
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_subplot_grid(data):
    fig, axes = plt.subplots(2, 2, figsize=(10, 8))

    # Line plot
    axes[0, 0].plot(data['line']['x'], data['line']['y'])
    axes[0, 0].set_title('Line Plot')

    # Bar plot
    axes[0, 1].bar(data['bar']['x'], data['bar']['y'])
    axes[0, 1].set_title('Bar Plot')

    # Scatter plot
    axes[1, 0].scatter(data['scatter']['x'], data['scatter']['y'])
    axes[1, 0].set_title('Scatter Plot')

    # Histogram
    axes[1, 1].hist(data['hist']['values'], bins=10)
    axes[1, 1].set_title('Histogram')

    plt.tight_layout()
    return fig`,
    testCases: [
      {
        input: 'data with line, bar, scatter, and hist keys',
        expectedOutput: 'Figure with 2x2 subplots',
        isHidden: false,
        description: 'Multiple plot types'
      }
    ],
    hints: [
      'Use plt.subplots(2, 2) to create a 2x2 grid',
      'Access subplots with axes[row, col]',
      'Use different plot methods for each subplot',
      'Use plt.tight_layout() to adjust spacing'
    ]
  },
  {
    id: 'cs407-ex-5-6',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Seaborn Box Plot',
    description: 'Write a function that creates a box plot using seaborn to show distributions across categories.',
    difficulty: 2,
    language: 'python',
    starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

def create_box_plot(df, x_col, y_col, title):
    # Create a box plot showing y_col distribution for each x_col category
    # Return the figure object
    pass`,
    solution: `import seaborn as sns
import matplotlib.pyplot as plt

def create_box_plot(df, x_col, y_col, title):
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.boxplot(data=df, x=x_col, y=y_col, ax=ax)
    ax.set_title(title)
    return fig`,
    testCases: [
      {
        input: 'df with category and value columns',
        expectedOutput: 'Figure with box plot',
        isHidden: false,
        description: 'Box plot by category'
      },
      {
        input: 'df with group and score columns',
        expectedOutput: 'Figure with box plot',
        isHidden: false,
        description: 'Score distribution by group'
      }
    ],
    hints: [
      'Use sns.boxplot(data=df, x=x_col, y=y_col, ax=ax)',
      'Create figure and axes first',
      'Set the title using ax.set_title()',
      'Return the figure object'
    ]
  },
  {
    id: 'cs407-ex-5-7',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Correlation Heatmap',
    description: 'Write a function that creates a correlation heatmap using seaborn.',
    difficulty: 3,
    language: 'python',
    starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

def create_correlation_heatmap(df, title):
    # Create a heatmap showing correlations between numeric columns
    # Include annotations showing correlation values
    # Return the figure object
    pass`,
    solution: `import seaborn as sns
import matplotlib.pyplot as plt

def create_correlation_heatmap(df, title):
    fig, ax = plt.subplots(figsize=(10, 8))
    correlation_matrix = df.corr()
    sns.heatmap(correlation_matrix, annot=True, fmt='.2f',
                cmap='coolwarm', center=0, ax=ax)
    ax.set_title(title)
    return fig`,
    testCases: [
      {
        input: 'df with multiple numeric columns',
        expectedOutput: 'Figure with correlation heatmap',
        isHidden: false,
        description: 'Correlation matrix visualization'
      },
      {
        input: 'df with 3 numeric features',
        expectedOutput: 'Figure with 3x3 heatmap',
        isHidden: false,
        description: 'Small correlation matrix'
      }
    ],
    hints: [
      'Use df.corr() to get correlation matrix',
      'Use sns.heatmap() with annot=True to show values',
      'Set fmt=".2f" to format decimals',
      'Use cmap="coolwarm" and center=0 for better visualization'
    ]
  },
  {
    id: 'cs407-ex-5-8',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Violin Plot with Split',
    description: 'Write a function that creates a split violin plot to compare two groups.',
    difficulty: 3,
    language: 'python',
    starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

def create_split_violin(df, x_col, y_col, hue_col, title):
    # Create a split violin plot
    # Return the figure object
    pass`,
    solution: `import seaborn as sns
import matplotlib.pyplot as plt

def create_split_violin(df, x_col, y_col, hue_col, title):
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.violinplot(data=df, x=x_col, y=y_col, hue=hue_col,
                   split=True, ax=ax)
    ax.set_title(title)
    return fig`,
    testCases: [
      {
        input: 'df with category, value, and group columns',
        expectedOutput: 'Figure with split violin plot',
        isHidden: false,
        description: 'Comparing two groups'
      }
    ],
    hints: [
      'Use sns.violinplot() with split=True',
      'Specify x, y, and hue parameters',
      'hue_col determines which groups to split',
      'Set figure size for better visibility'
    ]
  },
  {
    id: 'cs407-ex-5-9',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Pair Plot',
    description: 'Write a function that creates a pair plot to show relationships between all numeric variables.',
    difficulty: 3,
    language: 'python',
    starterCode: `import seaborn as sns

def create_pair_plot(df, hue_col=None):
    # Create a pair plot showing relationships between all numeric columns
    # Color by hue_col if provided
    # Return the PairGrid object
    pass`,
    solution: `import seaborn as sns

def create_pair_plot(df, hue_col=None):
    if hue_col:
        pairplot = sns.pairplot(df, hue=hue_col, diag_kind='kde')
    else:
        pairplot = sns.pairplot(df, diag_kind='kde')
    return pairplot`,
    testCases: [
      {
        input: 'df with numeric columns',
        expectedOutput: 'PairGrid with scatter and KDE plots',
        isHidden: false,
        description: 'Basic pair plot'
      },
      {
        input: 'df with numeric columns and category for hue',
        expectedOutput: 'Colored pair plot',
        isHidden: false,
        description: 'Pair plot with grouping'
      }
    ],
    hints: [
      'Use sns.pairplot(df)',
      'Add hue=hue_col if hue_col is provided',
      'Set diag_kind="kde" for diagonal plots',
      'Return the pairplot object'
    ]
  },
  {
    id: 'cs407-ex-5-10',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Time Series Plot',
    description: 'Write a function that creates a time series plot with a rolling average overlay.',
    difficulty: 3,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt
import pandas as pd

def create_time_series_plot(dates, values, window, title):
    # Create a time series plot with original data and rolling average
    # window is the rolling window size
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt
import pandas as pd

def create_time_series_plot(dates, values, window, title):
    fig, ax = plt.subplots(figsize=(12, 6))

    # Convert to Series for rolling calculation
    series = pd.Series(values, index=pd.to_datetime(dates))
    rolling_avg = series.rolling(window=window).mean()

    ax.plot(series.index, series.values, label='Original', alpha=0.6)
    ax.plot(rolling_avg.index, rolling_avg.values,
            label=f'{window}-period Moving Avg', linewidth=2)
    ax.set_title(title)
    ax.set_xlabel('Date')
    ax.set_ylabel('Value')
    ax.legend()
    ax.grid(True, alpha=0.3)
    return fig`,
    testCases: [
      {
        input: 'dates and values with window=3',
        expectedOutput: 'Figure with time series and moving average',
        isHidden: false,
        description: 'Time series with 3-period average'
      },
      {
        input: 'dates and values with window=7',
        expectedOutput: 'Figure with 7-period moving average',
        isHidden: false,
        description: 'Weekly moving average'
      }
    ],
    hints: [
      'Convert to pandas Series with datetime index',
      'Use series.rolling(window=window).mean()',
      'Plot both original and rolling average',
      'Add legend and grid for clarity'
    ]
  },
  {
    id: 'cs407-ex-5-11',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Interactive Plotly Scatter',
    description: 'Write a function that creates an interactive scatter plot using Plotly with hover information.',
    difficulty: 3,
    language: 'python',
    starterCode: `import plotly.graph_objects as go

def create_interactive_scatter(x, y, names, title):
    # Create an interactive scatter plot with names shown on hover
    # Return the figure object
    pass`,
    solution: `import plotly.graph_objects as go

def create_interactive_scatter(x, y, names, title):
    fig = go.Figure(data=go.Scatter(
        x=x,
        y=y,
        mode='markers',
        text=names,
        marker=dict(size=10, color='blue', opacity=0.6)
    ))

    fig.update_layout(
        title=title,
        xaxis_title='X',
        yaxis_title='Y',
        hovermode='closest'
    )

    return fig`,
    testCases: [
      {
        input: 'x=[1, 2, 3], y=[2, 4, 6], names=["A", "B", "C"], title="Interactive Plot"',
        expectedOutput: 'Plotly figure with interactive scatter',
        isHidden: false,
        description: 'Basic interactive scatter'
      }
    ],
    hints: [
      'Use go.Figure() with go.Scatter()',
      'Set mode="markers" for scatter plot',
      'Use text parameter for hover labels',
      'Update layout with title and axis labels'
    ]
  },
  {
    id: 'cs407-ex-5-12',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Plotly Bar Chart with Animation',
    description: 'Write a function that creates an animated bar chart using Plotly showing data over time.',
    difficulty: 4,
    language: 'python',
    starterCode: `import plotly.express as px

def create_animated_bar_chart(df, x_col, y_col, animation_col, title):
    # Create an animated bar chart where frames are determined by animation_col
    # Return the figure object
    pass`,
    solution: `import plotly.express as px

def create_animated_bar_chart(df, x_col, y_col, animation_col, title):
    fig = px.bar(df,
                 x=x_col,
                 y=y_col,
                 animation_frame=animation_col,
                 title=title,
                 range_y=[0, df[y_col].max() * 1.1])

    fig.update_layout(
        xaxis_title=x_col,
        yaxis_title=y_col,
        showlegend=False
    )

    return fig`,
    testCases: [
      {
        input: 'df with category, value, and year columns',
        expectedOutput: 'Animated bar chart by year',
        isHidden: false,
        description: 'Animated over time'
      }
    ],
    hints: [
      'Use px.bar() with animation_frame parameter',
      'Set range_y to keep y-axis stable across frames',
      'Update layout for better appearance',
      'animation_frame determines which column creates frames'
    ]
  },
  {
    id: 'cs407-ex-5-13',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Plotly 3D Surface Plot',
    description: 'Write a function that creates a 3D surface plot using Plotly.',
    difficulty: 4,
    language: 'python',
    starterCode: `import plotly.graph_objects as go
import numpy as np

def create_3d_surface(x, y, z, title):
    # Create a 3D surface plot
    # z should be a 2D array
    # Return the figure object
    pass`,
    solution: `import plotly.graph_objects as go
import numpy as np

def create_3d_surface(x, y, z, title):
    fig = go.Figure(data=[go.Surface(x=x, y=y, z=z)])

    fig.update_layout(
        title=title,
        scene=dict(
            xaxis_title='X',
            yaxis_title='Y',
            zaxis_title='Z'
        ),
        autosize=True
    )

    return fig`,
    testCases: [
      {
        input: 'x, y as 1D arrays, z as 2D array',
        expectedOutput: '3D surface plot',
        isHidden: false,
        description: 'Surface visualization'
      }
    ],
    hints: [
      'Use go.Surface() with x, y, z parameters',
      'z must be a 2D array (matrix)',
      'Update layout with scene dict for 3D axis labels',
      'Set autosize=True for responsive sizing'
    ]
  },
  {
    id: 'cs407-ex-5-14',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Customized Plot Style',
    description: 'Write a function that creates a professional-looking plot with custom styling including colors, fonts, and grid.',
    difficulty: 3,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt

def create_styled_plot(x, y, title):
    # Create a line plot with professional styling:
    # - Custom color scheme
    # - Grid with specific alpha
    # - Custom font sizes
    # - Figure size 12x6
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt

def create_styled_plot(x, y, title):
    plt.style.use('seaborn-v0_8-darkgrid')
    fig, ax = plt.subplots(figsize=(12, 6))

    ax.plot(x, y, color='#2E86AB', linewidth=2.5, marker='o',
            markersize=6, markerfacecolor='#A23B72')

    ax.set_title(title, fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('X Axis', fontsize=12)
    ax.set_ylabel('Y Axis', fontsize=12)

    ax.grid(True, alpha=0.3, linestyle='--')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    return fig`,
    testCases: [
      {
        input: 'x=[1, 2, 3, 4, 5], y=[2, 4, 3, 5, 6], title="Professional Plot"',
        expectedOutput: 'Styled figure with custom colors and formatting',
        isHidden: false,
        description: 'Professional styling'
      }
    ],
    hints: [
      'Use plt.style.use() to set a base style',
      'Customize colors with hex codes',
      'Set linewidth, marker properties',
      'Remove top and right spines for cleaner look',
      'Use fontsize and fontweight for title'
    ]
  },
  {
    id: 'cs407-ex-5-15',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Dashboard Layout',
    description: 'Write a function that creates a dashboard layout with multiple plots showing different aspects of the same dataset.',
    difficulty: 4,
    language: 'python',
    starterCode: `import matplotlib.pyplot as plt
import seaborn as sns

def create_dashboard(df, numeric_col, category_col):
    # Create a 3-subplot dashboard:
    # - Top: distribution histogram
    # - Bottom left: box plot by category
    # - Bottom right: violin plot by category
    # Return the figure object
    pass`,
    solution: `import matplotlib.pyplot as plt
import seaborn as sns

def create_dashboard(df, numeric_col, category_col):
    fig = plt.figure(figsize=(14, 10))
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.3)

    # Top subplot - spans both columns
    ax1 = fig.add_subplot(gs[0, :])
    ax1.hist(df[numeric_col], bins=20, edgecolor='black', alpha=0.7)
    ax1.set_title(f'Distribution of {numeric_col}', fontsize=14, fontweight='bold')
    ax1.set_xlabel(numeric_col)
    ax1.set_ylabel('Frequency')

    # Bottom left - box plot
    ax2 = fig.add_subplot(gs[1, 0])
    sns.boxplot(data=df, x=category_col, y=numeric_col, ax=ax2)
    ax2.set_title(f'Box Plot by {category_col}', fontsize=12)

    # Bottom right - violin plot
    ax3 = fig.add_subplot(gs[1, 1])
    sns.violinplot(data=df, x=category_col, y=numeric_col, ax=ax3)
    ax3.set_title(f'Violin Plot by {category_col}', fontsize=12)

    return fig`,
    testCases: [
      {
        input: 'df with numeric and categorical columns',
        expectedOutput: 'Dashboard with 3 plots',
        isHidden: false,
        description: 'Multi-plot dashboard'
      }
    ],
    hints: [
      'Use GridSpec for flexible subplot layout',
      'Top plot spans both columns: gs[0, :]',
      'Bottom plots use gs[1, 0] and gs[1, 1]',
      'Set hspace and wspace for spacing',
      'Use different plot types for different insights'
    ]
  },
  {
    id: 'cs407-ex-5-16',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Geographic Bubble Map',
    description: 'Write a function that creates a geographic scatter plot (bubble map) using Plotly where bubble size represents a value.',
    difficulty: 4,
    language: 'python',
    starterCode: `import plotly.express as px

def create_geo_bubble_map(df, lat_col, lon_col, size_col, color_col, title):
    # Create a geographic bubble map
    # Bubble size determined by size_col
    # Bubble color determined by color_col
    # Return the figure object
    pass`,
    solution: `import plotly.express as px

def create_geo_bubble_map(df, lat_col, lon_col, size_col, color_col, title):
    fig = px.scatter_geo(df,
                         lat=lat_col,
                         lon=lon_col,
                         size=size_col,
                         color=color_col,
                         hover_data=[size_col, color_col],
                         title=title,
                         projection='natural earth')

    fig.update_layout(
        geo=dict(
            showland=True,
            landcolor='lightgray',
            showcountries=True,
            countrycolor='white'
        )
    )

    return fig`,
    testCases: [
      {
        input: 'df with lat, lon, population, and gdp columns',
        expectedOutput: 'Geographic bubble map',
        isHidden: false,
        description: 'World data visualization'
      }
    ],
    hints: [
      'Use px.scatter_geo() for geographic plots',
      'Specify lat, lon, size, and color parameters',
      'Set projection (e.g., "natural earth")',
      'Update geo layout for map appearance',
      'Add hover_data for interactivity'
    ]
  }
];
