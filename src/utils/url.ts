export function createQueryFromCategoryName(categoryName: string) {
  return categoryName.toLowerCase().replaceAll(' ', '-');
}
