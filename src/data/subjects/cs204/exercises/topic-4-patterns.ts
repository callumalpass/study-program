import { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t4-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Pattern Categories',
    description: 'Explain the three categories of GoF design patterns (Creational, Structural, Behavioral). Provide one example pattern from each category and describe its purpose.',
    difficulty: 1,
    hints: [
      'Think about what problem each category addresses',
      'Creational deals with object creation',
      'Structural deals with composition',
      'Behavioral deals with communication'
    ],
    solution: `**Creational Patterns** - Control object creation mechanisms.
Example: Factory Method - Defines interface for creating objects, letting subclasses decide which class to instantiate.

**Structural Patterns** - Compose objects into larger structures.
Example: Adapter - Converts one interface to another that clients expect.

**Behavioral Patterns** - Define object communication and responsibility.
Example: Observer - Defines one-to-many dependency so when one object changes, dependents are notified automatically.`
  },
  {
    id: 'cs204-t4-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Singleton Pattern',
    description: 'A logging system should have exactly one instance accessible throughout an application. Design this using the Singleton pattern. Address thread safety concerns.',
    difficulty: 2,
    hints: [
      'Private constructor prevents external instantiation',
      'Static method provides global access point',
      'Consider lazy vs eager initialization',
      'Double-checked locking for thread safety'
    ],
    solution: `class Logger {
  private static instance: Logger;
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void { /* ... */ }
}

**Thread Safety**: Use synchronized/lock in getInstance() or eager initialization (create instance at class loading). Double-checked locking reduces synchronization overhead.`
  },
  {
    id: 'cs204-t4-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Factory Method Pattern',
    description: 'A document application needs to create different document types (PDF, Word, Text). Design a solution using Factory Method that allows easy addition of new document types.',
    difficulty: 2,
    hints: [
      'Define abstract creator with factory method',
      'Concrete creators override to produce specific products',
      'Products share common interface',
      'New types require only new creator subclass'
    ],
    solution: `interface Document { open(): void; save(): void; }

abstract class Application {
  abstract createDocument(): Document;  // Factory Method

  newDocument(): Document {
    const doc = this.createDocument();
    doc.open();
    return doc;
  }
}

class PDFApplication extends Application {
  createDocument(): Document { return new PDFDocument(); }
}

class WordApplication extends Application {
  createDocument(): Document { return new WordDocument(); }
}

**Benefit**: Adding new document type requires only new Document class and Application subclass.`
  },
  {
    id: 'cs204-t4-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Abstract Factory Pattern',
    description: 'A UI toolkit must support multiple themes (Light, Dark). Each theme provides consistent Button, TextField, and Checkbox styles. Design using Abstract Factory.',
    difficulty: 3,
    hints: [
      'Abstract factory declares creation methods for product family',
      'Concrete factories implement for each theme',
      'Products belong to families that work together',
      'Client code uses factories through abstract interface'
    ],
    solution: `interface UIFactory {
  createButton(): Button;
  createTextField(): TextField;
  createCheckbox(): Checkbox;
}

class LightThemeFactory implements UIFactory {
  createButton() { return new LightButton(); }
  createTextField() { return new LightTextField(); }
  createCheckbox() { return new LightCheckbox(); }
}

class DarkThemeFactory implements UIFactory {
  createButton() { return new DarkButton(); }
  // ... similar for other components
}

// Client uses factory without knowing concrete types
function buildUI(factory: UIFactory) {
  const btn = factory.createButton();
  const txt = factory.createTextField();
}

**Key**: Ensures UI components are from same family (no mixing light buttons with dark textfields).`
  },
  {
    id: 'cs204-t4-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Builder Pattern',
    description: 'A meal ordering system creates complex meal objects with main, side, drink, and dessert (each optional). Design using Builder pattern to construct meals step-by-step.',
    difficulty: 2,
    hints: [
      'Builder provides methods for each optional part',
      'Methods return builder for chaining',
      'build() method returns final product',
      'Director can define preset configurations'
    ],
    solution: `class Meal {
  main?: string; side?: string; drink?: string; dessert?: string;
}

class MealBuilder {
  private meal = new Meal();

  withMain(m: string) { this.meal.main = m; return this; }
  withSide(s: string) { this.meal.side = s; return this; }
  withDrink(d: string) { this.meal.drink = d; return this; }
  withDessert(d: string) { this.meal.dessert = d; return this; }
  build() { return this.meal; }
}

// Usage:
const meal = new MealBuilder()
  .withMain("Burger")
  .withDrink("Cola")
  .build();

**Benefit**: Avoids constructors with many optional parameters; clearly expresses what's being set.`
  },
  {
    id: 'cs204-t4-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Adapter Pattern',
    description: 'Your application uses a MediaPlayer interface, but you have a third-party AdvancedMediaLibrary with incompatible methods. Design an Adapter to integrate it.',
    difficulty: 2,
    hints: [
      'Adapter implements target interface',
      'Adapter holds reference to adaptee',
      'Adapter translates calls to adaptee methods',
      'Object adapter uses composition'
    ],
    solution: `// Target interface (what client expects)
interface MediaPlayer {
  play(file: string): void;
}

// Adaptee (third-party library)
class AdvancedMediaLibrary {
  loadMedia(path: string): void { /* ... */ }
  startPlayback(): void { /* ... */ }
}

// Adapter
class MediaAdapter implements MediaPlayer {
  constructor(private library: AdvancedMediaLibrary) {}

  play(file: string): void {
    this.library.loadMedia(file);
    this.library.startPlayback();
  }
}

// Usage: const player: MediaPlayer = new MediaAdapter(new AdvancedMediaLibrary());

**Key**: Client code works with MediaPlayer interface, unaware of AdvancedMediaLibrary.`
  },
  {
    id: 'cs204-t4-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Decorator Pattern',
    description: 'A coffee shop has base coffee with optional additions (milk, sugar, whipped cream) that add cost. Design using Decorator to dynamically add features without subclass explosion.',
    difficulty: 3,
    hints: [
      'Component interface defines operations',
      'Decorators wrap components and implement same interface',
      'Decorators delegate to wrapped object and add behavior',
      'Decorators can be stacked'
    ],
    solution: `interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class BasicCoffee implements Coffee {
  getCost() { return 2.00; }
  getDescription() { return "Coffee"; }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  getCost() { return this.coffee.getCost(); }
  getDescription() { return this.coffee.getDescription(); }
}

class MilkDecorator extends CoffeeDecorator {
  getCost() { return this.coffee.getCost() + 0.50; }
  getDescription() { return this.coffee.getDescription() + ", Milk"; }
}

// Usage:
const order = new MilkDecorator(new WhipDecorator(new BasicCoffee()));
// Dynamically combines behaviors without creating MilkWhipCoffee subclass.`
  },
  {
    id: 'cs204-t4-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Observer Pattern',
    description: 'A weather station should notify multiple displays (CurrentConditions, Statistics, Forecast) when measurements change. Design using Observer pattern.',
    difficulty: 2,
    hints: [
      'Subject maintains list of observers',
      'Subject notifies all observers on state change',
      'Observers register/unregister themselves',
      'Push vs pull notification models'
    ],
    solution: `interface Observer { update(temp: number, humidity: number): void; }

interface Subject {
  attach(o: Observer): void;
  detach(o: Observer): void;
  notify(): void;
}

class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temp = 0; private humidity = 0;

  attach(o: Observer) { this.observers.push(o); }
  detach(o: Observer) { this.observers = this.observers.filter(x => x !== o); }
  notify() { this.observers.forEach(o => o.update(this.temp, this.humidity)); }

  setMeasurements(t: number, h: number) {
    this.temp = t; this.humidity = h;
    this.notify();
  }
}

class CurrentConditionsDisplay implements Observer {
  update(temp: number, humidity: number) { console.log(\`Temp: \${temp}, Humidity: \${humidity}\`); }
}

**Benefit**: Loose coupling - WeatherStation doesn't know concrete display types.`
  },
  {
    id: 'cs204-t4-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Strategy Pattern',
    description: 'A navigation app should support different routing strategies (fastest, shortest, scenic). Design using Strategy to allow runtime algorithm switching.',
    difficulty: 2,
    hints: [
      'Strategy interface declares algorithm method',
      'Concrete strategies implement specific algorithms',
      'Context holds strategy reference',
      'Strategy can be changed at runtime'
    ],
    solution: `interface RouteStrategy {
  calculateRoute(start: Point, end: Point): Route;
}

class FastestRoute implements RouteStrategy {
  calculateRoute(start: Point, end: Point): Route {
    // Considers traffic, road types for speed
    return route;
  }
}

class ShortestRoute implements RouteStrategy {
  calculateRoute(start: Point, end: Point): Route {
    // Minimizes distance regardless of speed
    return route;
  }
}

class Navigator {
  constructor(private strategy: RouteStrategy) {}

  setStrategy(s: RouteStrategy) { this.strategy = s; }

  navigate(start: Point, end: Point): Route {
    return this.strategy.calculateRoute(start, end);
  }
}

// Usage:
navigator.setStrategy(new ScenicRoute()); // Switch algorithm at runtime`
  },
  {
    id: 'cs204-t4-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Command Pattern',
    description: 'A text editor needs undo/redo functionality for operations like insert, delete, and format. Design using Command pattern to encapsulate operations as objects.',
    difficulty: 3,
    hints: [
      'Command interface with execute() and undo()',
      'Concrete commands store state needed for undo',
      'Invoker maintains command history stack',
      'Commands can be queued, logged, or undone'
    ],
    solution: `interface Command {
  execute(): void;
  undo(): void;
}

class InsertTextCommand implements Command {
  constructor(private doc: Document, private pos: number, private text: string) {}

  execute() { this.doc.insertAt(this.pos, this.text); }
  undo() { this.doc.deleteAt(this.pos, this.text.length); }
}

class Editor {
  private history: Command[] = [];
  private undone: Command[] = [];

  executeCommand(cmd: Command) {
    cmd.execute();
    this.history.push(cmd);
    this.undone = [];
  }

  undo() {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.undone.push(cmd); }
  }

  redo() {
    const cmd = this.undone.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }
}`
  },
  {
    id: 'cs204-t4-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Composite Pattern',
    description: 'A file system has files and folders. Folders can contain files or other folders. Design using Composite to treat individual files and compositions uniformly.',
    difficulty: 3,
    hints: [
      'Component defines interface for all objects',
      'Leaf represents end objects (files)',
      'Composite contains children (folders)',
      'Same operations work on both leaves and composites'
    ],
    solution: `interface FileSystemItem {
  getName(): string;
  getSize(): number;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number) {}
  getName() { return this.name; }
  getSize() { return this.size; }
}

class Folder implements FileSystemItem {
  private items: FileSystemItem[] = [];
  constructor(private name: string) {}

  add(item: FileSystemItem) { this.items.push(item); }
  getName() { return this.name; }
  getSize() {
    return this.items.reduce((sum, item) => sum + item.getSize(), 0);
  }
}

// Usage: folder.getSize() recursively calculates total size
// Client treats files and folders identically through FileSystemItem interface.`
  },
  {
    id: 'cs204-t4-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'State Pattern',
    description: 'A vending machine has states: NoCoin, HasCoin, Dispensing, SoldOut. Behavior varies by state. Design using State pattern to avoid complex conditionals.',
    difficulty: 3,
    hints: [
      'State interface declares state-specific behaviors',
      'Concrete states implement behavior for each state',
      'Context delegates to current state object',
      'State transitions change context state reference'
    ],
    solution: `interface VendingState {
  insertCoin(): void;
  ejectCoin(): void;
  dispense(): void;
}

class NoCoinState implements VendingState {
  constructor(private machine: VendingMachine) {}

  insertCoin() {
    console.log("Coin inserted");
    this.machine.setState(this.machine.hasCoinState);
  }
  ejectCoin() { console.log("No coin to eject"); }
  dispense() { console.log("Insert coin first"); }
}

class VendingMachine {
  noCoinState = new NoCoinState(this);
  hasCoinState = new HasCoinState(this);
  // ... other states

  private state: VendingState = this.noCoinState;

  setState(s: VendingState) { this.state = s; }
  insertCoin() { this.state.insertCoin(); }
  // ... delegate other methods
}

**Benefit**: Each state's logic is isolated; adding states doesn't require modifying existing code.`
  },
  {
    id: 'cs204-t4-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Facade Pattern',
    description: 'A home theater system has multiple subsystems (DVDPlayer, Projector, SoundSystem, Lights). Design a Facade to provide simple "watchMovie()" interface.',
    difficulty: 2,
    hints: [
      'Facade provides simplified interface to complex subsystem',
      'Facade coordinates multiple objects',
      'Clients can still access subsystems directly if needed',
      'Reduces coupling between clients and subsystems'
    ],
    solution: `class HomeTheaterFacade {
  constructor(
    private dvd: DVDPlayer,
    private projector: Projector,
    private sound: SoundSystem,
    private lights: Lights
  ) {}

  watchMovie(movie: string) {
    this.lights.dim(10);
    this.projector.on();
    this.projector.setInput("DVD");
    this.sound.on();
    this.sound.setSurroundMode();
    this.dvd.on();
    this.dvd.play(movie);
  }

  endMovie() {
    this.dvd.stop();
    this.dvd.off();
    this.sound.off();
    this.projector.off();
    this.lights.on();
  }
}

// Client just calls: theater.watchMovie("Inception");
// Instead of coordinating all subsystems manually.`
  },
  {
    id: 'cs204-t4-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Template Method Pattern',
    description: 'Beverages (tea, coffee) follow similar preparation: boilWater, brew, pourInCup, addCondiments. Only brew and condiments differ. Design using Template Method.',
    difficulty: 2,
    hints: [
      'Abstract class defines template method with algorithm skeleton',
      'Template method calls abstract methods (hooks)',
      'Subclasses override only the varying steps',
      'Common steps defined in base class'
    ],
    solution: `abstract class Beverage {
  // Template Method - defines algorithm structure
  prepare(): void {
    this.boilWater();
    this.brew();          // Abstract - varies
    this.pourInCup();
    this.addCondiments(); // Abstract - varies
  }

  private boilWater() { console.log("Boiling water"); }
  private pourInCup() { console.log("Pouring into cup"); }

  abstract brew(): void;
  abstract addCondiments(): void;
}

class Coffee extends Beverage {
  brew() { console.log("Dripping coffee through filter"); }
  addCondiments() { console.log("Adding sugar and milk"); }
}

class Tea extends Beverage {
  brew() { console.log("Steeping tea"); }
  addCondiments() { console.log("Adding lemon"); }
}

**Key**: Algorithm structure is fixed; only specific steps are customized.`
  },
  {
    id: 'cs204-t4-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Pattern Selection',
    description: 'For each scenario, identify the most appropriate pattern and justify: (1) Parse different config formats (JSON, XML, YAML), (2) Notify UI components of data changes, (3) Add encryption layer to existing stream class.',
    difficulty: 4,
    hints: [
      'Consider what problem each pattern solves',
      'Think about flexibility needs',
      'Consider coupling implications',
      'Some scenarios might have multiple valid patterns'
    ],
    solution: `**1. Parse config formats** → **Strategy Pattern**
Justification: Different parsing algorithms that can be swapped. Create ConfigParser interface with JSONParser, XMLParser, YAMLParser strategies. Context switches parser based on file extension.

**2. Notify UI of data changes** → **Observer Pattern**
Justification: One-to-many relationship where data model notifies multiple UI components. Model is Subject; UI components are Observers. Decouples data layer from presentation.

**3. Add encryption to streams** → **Decorator Pattern**
Justification: Adds responsibility (encryption) dynamically without modifying original stream. EncryptedStream wraps base Stream, encrypts on write, decrypts on read. Can stack with other decorators (compression).`
  },
  {
    id: 'cs204-t4-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-4',
    type: 'written' as const,
    title: 'Pattern Refactoring',
    description: 'Given code with complex switch statements handling different notification channels (email, SMS, push), identify code smells and refactor using appropriate pattern(s).',
    difficulty: 5,
    hints: [
      'Switch on type often signals need for polymorphism',
      'Consider Strategy or Command patterns',
      'Factory can help create correct strategy',
      'Think about Open/Closed Principle'
    ],
    solution: `**Original Code Smells:**
- Switch statement on notification type
- Adding new channel requires modifying existing code (violates OCP)
- Logic for all channels in one place

**Refactored Solution using Strategy + Factory:**

interface NotificationChannel {
  send(message: string, recipient: string): void;
}

class EmailChannel implements NotificationChannel { /* email logic */ }
class SMSChannel implements NotificationChannel { /* SMS logic */ }
class PushChannel implements NotificationChannel { /* push logic */ }

class NotificationFactory {
  static create(type: string): NotificationChannel {
    const channels = { email: EmailChannel, sms: SMSChannel, push: PushChannel };
    return new channels[type]();
  }
}

class NotificationService {
  send(type: string, message: string, recipient: string) {
    NotificationFactory.create(type).send(message, recipient);
  }
}

**Benefits:** New channels require only new class + factory entry. Each channel's logic is encapsulated.`
  }
];
