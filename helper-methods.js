function findCategory(lineItem, itemVariations, items, categories) {
  var variationId = lineItem.catalog_object_id;
  var itemId = itemVariations.reduce(function(itemVar, current){

        if (itemVar.id === variationId) {
          return itemVar;
        } else {
          return current;
        }
      
    }).item_variation_data.item_id;
  var categoryId = items.reduce(function(item, current){

        if (item.id === itemId) {
          return item;
        } else {
          return current;
        }
      
    }).item_data.category_id;
  var categoryName = categories.reduce(function(category, current){

        if (category.id === categoryId) {
          return category;
        } else {
          return current;
        }
      
    }).category_data.name;
  return categoryName;
}

function getUnit(lineItem) {
  if (lineItem.quantity_unit === undefined) {
    return undefined;
  }
  switch (lineItem.quantity_unit.type) {
    case 'TYPE_CUSTOM':
      return lineItem.quantity_unit.custom_unit.name;
    case 'TYPE_AREA':
      return lineItem.quantity_unit.area_unit;
    case 'TYPE_LENGTH':
      return lineItem.quantity_unit.length_unit;
    case 'TYPE_VOLUME':
      return lineItem.quantity_unit.volume_unit;
    case 'TYPE_WEIGHT':
      return lineItem.quantity_unit.weight_unit;
    case 'TYPE_GENERIC':
      return lineItem.quantity_unit.generic_unit;
  }
}

function findModList(modifier, modLists){
 var finalModList = modLists.reduce(function(modList, current){
   var modIds = modList.modifier_list_data.modifiers.map(function(mod) {return mod.id});
   console.log(modifier.catalog_object_id);
   if (modIds.indexOf(modifier.catalog_object_id) > -1) {
          return modList;
        } else {
          return current;
        }
      
    });
  
  if (finalModList === undefined) {
    return 'Unknown';
  }
  return finalModList.modifier_list_data.name;
}

function removeDups(inputList) {
  return inputList.filter(distinct);
}

function distinct(value, index, self) {
  return self.indexOf(value) === index;
}