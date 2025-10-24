export const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('uk-UA');
  };
  
  export const formatPrice = (amount, currency = 'грн') => {
    return amount.toLocaleString('uk-UA') + ' ' + currency;
  };
  