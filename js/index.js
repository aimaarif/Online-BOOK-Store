new Vue({
  el: '#app',
  data:{
    groupWrapper: "list-group-item",
    isShowingCart: false,
    cart: {
      items: []
    },
    products: [
      {
        id: 1,
        picture: 'images/sre.jpg',
        name: "The Meghaduta of Kalidasa(Sanskrit)",
        description:
        "Meghadūta is a lyric poem written by Kālidāsa, considered to be one of the greatest Sanskrit poets.A poem of 111 stanzas, it is one of Kālidāsa's most famous works. The work is divided into two parts, Purva-megha and Uttara-megha",
        price: 199,
        inStock: 50
      },
      {
        id: 2,
        picture: 'images/bln.jpg',
        name: "Bilhaneeyam(Telugu)",
        description:
        "story of Bilhana, Who wrote vikramankadeva charitam in sanskrit.",
        price: 75,
        inStock: 755
      },
      {
        id: 3,
        picture: 'images/wpme.png',
        name: "Word Power Made Easy",
        description:
        "For use in schools and libraries only. Exercises designed to develop vocabulary skills present words together with their pronunciations, definitions and use in sentences.",
        price: 149,
        inStock: 5
      },
      {
        id: 4,
        picture: 'images/mdsl.jpg',
        name: "Madhushala",
        description:
        "Madhushala is a book of 135 quatrains: verses of four lines by Hindi poet and writer Harivansh Rai Bachchan.",
        price: 100,
        inStock: 123
      },
      {
        id: 5,
        picture: 'images/cc.jpg',
        name: "Cloud computing",
        description:
        "Cloud computing―accessing computing resources over the Internet―is rapidly changing the landscape of information technology. Its primary benefits compared to on-premise computing models are reduced costs and increased agility and scalability. Hence, cloud computing is receiving considerable interest among several stakeholders―businesses, the IT industry, application developers, researchers, and students.",
        price: 676,
        inStock: 20
      },
      {
        id: 6,
        picture: 'images/ikl.jpg',
        name: "Indian kavya literature(Hardcover)",
        description:
        "It is multi-volume series work. The main pupose of this work is literary criticism, evaluating a great tradition of literature and to presen comprehensive study of sanskrit literature. So far 6 volumes have been published. Each volume presents literature itself in successive periods of its development. This second volume in the series on Kavya Literature begins the description of the literature itself.",
        price: 5000,
        inStock: 12
      },
      {
        id: 7,
        picture: 'images/book.jpg',
        name: "book",
        description:
        "It is multi-volume series work. The main pupose of this work is literary criticism, evaluating a great tradition of literature and to presen comprehensive study of sanskrit literature. So far 6 volumes have been published. Each volume presents literature itself in successive periods of its development. This second volume in the series on Kavya Literature begins the description of the literature itself.",
        price: 345,
        inStock: 10
      },


    ]
  },
  computed:{
    cartTotal: function() {
      var total = 0;
      this.cart.items.forEach(function(item) {
        total += item.quantity * item.product.price;
      });
      return total;
    },
    taxAmount: function() {
      return this.cartTotal * 10 / 100;
    }
  },
  filters: {
    currency: function(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods:{
    removeItemFromCart: function(cartItem) {
      var index = this.cart.items.indexOf(cartItem);

      if (index !== -1) {
        this.cart.items.splice(index, 1);
      }
    },
    checkout: function() {
      if (confirm('Are you sure that you want to purchase these products?')) {
        this.cart.items.forEach(function(item) {
          item.product.inStock += item.quantity;
        });

        this.cart.items = [];
      }
    },
    addProductToCart: function(product) {
      var cartItem = this.getCartItem(product);

      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        this.cart.items.push({
          product: product,
          quantity: 1
        });
      }
      product.inStock--;
    },
    increaseQuantity: function(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    decreaseQuantity: function(cartItem) {
      cartItem.quantity--;
      cartItem.product.inStock++;
      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    getCartItem: function(product) {
      for (var i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i];
        }
      }

      return null;
    },
    listWrapper:function(){
      this.groupWrapper = "list-group-item"
    },
    gridWrapper:function(){
      this.groupWrapper = "grid-group-item"
    }
  }
})
