export function limitProductionDescription(productionDescription) {
  if (productionDescription.length > 39) {
    return productionDescription.substring(0, 37) + '...'
  } else {
    return productionDescription
  }
}