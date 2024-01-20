//ONE TO MANY WITH BASKETITEM

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();


        public void AddItem(Product product, int quantity)
        {
             int index = Items.FindIndex(item => item.ProductId == product.Id);
             if(index == -1)
                Items.Add(new BasketItem{Product = product, Quantity = quantity});
             else
                Items[index].Quantity += quantity;   
        }

        public void RemoveItem(int productId, int quantity)
        {
            int index = Items.FindIndex(item => item.ProductId == productId);
            if(index != -1)
            {
                if(Items[index].Quantity == quantity)
                Items.RemoveAt(index);
                else
                Items[index].Quantity -= quantity;
            }
        }
    }

}