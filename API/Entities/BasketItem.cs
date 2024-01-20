//ONE TO ONE WITH PRODUCT
// ONE TO MANY WITH BASKET

using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; } 
        public int Quantity { get; set; }


        //navigation properties

        //opens cascade to product
        public int ProductId { get; set; }
        public Product Product { get; set; }

        //opens cascade to basket
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}