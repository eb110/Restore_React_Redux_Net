export const convertPriceToPounds = (price: number): string => {
    return `${(price / 100).toFixed(2)} £`
}
export const getCookie = (key: string): string | undefined => {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }