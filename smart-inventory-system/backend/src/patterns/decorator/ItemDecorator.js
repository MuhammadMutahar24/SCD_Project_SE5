class LabelDecorator {
  constructor(item, labels = []) {
    this.id = item.id;
    this.name = item.name;
    this.quantity = item.quantity;
    this.price = item.price;
    this.sku = item.sku;
    this.labels = labels;
  }

  getLabels() {
    return this.labels;
  }

  addLabel(label) {
    if (!this.labels.includes(label)) {
      this.labels.push(label);
    }
  }

  removeLabel(label) {
    this.labels = this.labels.filter(l => l !== label);
  }
}

module.exports = { LabelDecorator };