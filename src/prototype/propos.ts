String.prototype.toCamelCase = function (): string {
  return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g, (ltr, idx) =>
    idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase(),
  ).replace(/\s+|-/g, "");
};

export {};
