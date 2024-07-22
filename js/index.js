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
        id: 2,
        picture: 'images/GreatWomenOfIslam.png',
        name: "Great Women Of Islam",
        description:
        "There are good examples in the lifestyle of the Mothers of the believers and women Companions especially for Muslim women. It is necessary for all of us to study the Seerah of these noble and fortunate women. Besides the Mothers of the believers, the compiler of the book has included the description of those sixteen women who had been given the good news of the paradise in this world by Prophet Muhammad (pbuh).",
        price: 475,
        inStock: 755
      },
      {
        id: 3,
        picture: 'images/LostIslamicHistory.png',
        name: "Lost ISlamic History",
        description:
       "Throughout, the impact of Islamic belief on scientific advancement, social structures, and cultural development is given due prominence, and the text is complemented by portraits of key personalities, inventions and little known historical nuggets. The history of Islam and of the world’s Muslims brings together diverse peoples, geographies and states, all interwoven into one narrative that begins with Muhammad (sallallahu alaihi wassalum) and continues to this day.",
        price: 1149,
        inStock: 5
      },
      {
        id: 4,
        picture: 'images/Doth.png',
        name: "Diseases of the Hearts & their Cures",
        description:
        "Translated by Abu Rumaysah “Know O beloved reader that it is most important to spend one’s time and energy in treating the heart, and hastening to correct and purify it from sickness and all sins. This is due to the heart occupying a great and lofty position in Islaam, for it is the place to which the Lord looks and the storehouse for tawheed, faith, and sincerity. Actions are distinguished, one from the other, with respect to their excellence in the Sight of Allah in accordance with the condition of the heart, not by their number or form, but rather due to the strength of the caller, his or her truthfulness, his or her sincerity and the extent to which he or she prefers Allah over himself or herself",
        price: 1395,
        inStock: 2
      },
      {
        id: 1,
        picture: 'images/FOTMI.jpg',
        name: "Fortress Of The Muslim",
        description:
        "Author: Said Bin Wahf Al-Qahtani Publisher: Darussalam Pages: 244 Translation of Hisnul-Muslim. (‘Citadel of the Believer’) This is a very beautiful booklet consists of many authentic Dua’s (supplications) for a Muslim to supplicate on a daily basis and on special occasions.",
        price: 365,
        inStock: 50
      },
      {
        id: 5,
        picture: 'images/AITTW.png',
        name: "An Inspiration To The World",
        description:
        "A Prophetic Biography Unlike Any Other! Unlike any book of Seerah that came before it. Based on authentic reports. Connecting the Seerah to our everyday, modern lives. Beyond biography – a project towards reformation of character. To guide you through all aspects and circumstances of life.",
        price: 4075,
        inStock: 20
      },
      {
        id: 6,
        picture: 'images/StoriesOfTheProphets.png',
        name: "Stories of the Prophets",
        description:
        "This classical work by the great scholar Ibn Kathir shares detailed information about the lives of the  Prophets mentioned by name in the Quran and Sunnah. The stories inclusively present whatever is known about these blessed individuals: the circumstances of their spreading the message, the nations where they lived, how they were treated, their unique trials and the results of their teaching. As one reads through the accounts, Allah’s reasons for sending the Prophets are unveiled. The distinct style of writing makes it easy for both adults and children to understand and makes a valuable addition to a Muslim family library.",
        price: 1995,
        inStock: 12
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
        currency: "PKR",
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
