import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs402-t5-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Basic CNN for Image Classification',
    difficulty: 3,
    description: `Build a convolutional neural network for MNIST digit classification.

Requirements:
- 2 convolutional layers with ReLU and max pooling
- 2 fully connected layers
- Softmax output for 10 classes
- Train using Adam optimizer
- Achieve >95% test accuracy`,
    starterCode: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        # Define layers
        
    def forward(self, x):
        # Implement forward pass
        pass
        
# Training loop
model = SimpleCNN()
# TODO: Implement training`,
    solution: `import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))  # 28->14
        x = self.pool(self.relu(self.conv2(x)))  # 14->7
        x = x.view(-1, 64 * 7 * 7)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Training
model = SimpleCNN()
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()`,
    testCases: [],
    hints: [
      'Start by defining Conv2d layers with appropriate input/output channels',
      'Use MaxPool2d after each convolutional layer to reduce spatial dimensions',
      'Flatten the output before passing to fully connected layers',
      'Use CrossEntropyLoss for multi-class classification',
      'Adam optimizer works well with learning rate around 0.001'
    ],
    language: 'python'
  },
  // 15 more exercises for topic 5
];
