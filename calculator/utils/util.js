// windowManager.js
class WindowManager {
    constructor(windowSize = 10) {
      this.windowSize = windowSize;
      this.window = []; // Store numbers in order of insertion
      this.uniqueSet = new Set(); // For fast lookup of unique numbers
    }

    getCurrentState() {
      return [...this.window];
    }
    addNumbers(newNumbers) {
      const prevState = this.getCurrentState();
      const addedNumbers = [];
      
      for (const num of newNumbers) {

        if (!this.uniqueSet.has(num)) {
          addedNumbers.push(num);
          this.uniqueSet.add(num);
          this.window.push(num);
          
          if (this.window.length > this.windowSize) {
            const removed = this.window.shift();
            this.uniqueSet.delete(removed);
          }
        }
      }
      
      return {
        windowPrevState: prevState,
        windowCurrState: this.getCurrentState(),
        addedNumbers
      };
    }
    calculateAverage() {
      if (this.window.length === 0) return 0;
      
      const sum = this.window.reduce((acc, num) => acc + num, 0);
      return parseFloat((sum / this.window.length).toFixed(2));
    }
    reset() {
      this.window = [];
      this.uniqueSet.clear();
    }
  }
  
  module.exports = WindowManager;