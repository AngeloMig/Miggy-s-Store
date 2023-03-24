/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */

 function checkoutValidate() {
  document.getElementById('mini-cart-form').submit();
  // if ($("input[name='zpDate']").val()) {
  // } else {
  //   alert('Please complete the address form.')
  //   $("input[name='checkout']").removeAttr('aria-busy')
  // }
}

// FORM POPUP (jquery)

$(function () {
    $(".form-popup--address-checker").on("click", function () {
      $(".address-checker").toggleClass("active");
      $(".form-inquiry--overlay").toggleClass("active");
      $("html").addClass('lock-all');
    });

    // $(".form-popup .product-item__image-wrapper").on("click", function (e) {

    //   console.log(e.target.localName)

    //   let form ='';
    //   if (e.target.localName == 'img') {
    //     form = $(e.target).parent().parent().siblings('.form-inquiry--popup-container');
    //   } else {
    //     form = $(e.target).parent().parent().parent().siblings('.form-inquiry--popup-container');
    //   }

    //     $(form).addClass('active');
    //     $(form).find('.cart-notification').addClass('active');
    //     $("html").addClass('lock-all');
    // });
  
    $(document).on("click",".form-inqury--close-btn",function (e) {
        e.stopPropagation()
        e.preventDefault();
        $(".form-inquiry--popup-container.active").toggleClass("active")
        $(".form-inquiry--popup-container.active .cart-notification").removeClass("active")
        $(".form-inquiry--overlay.active").removeClass("active")
        $("html").removeClass('lock-all');
    });
  });

  $('.payment-selection').on('change', function() {
    var new_price = $(this).find(':selected').data('price')
    var target = $(this).data('price-container')

    $(`#${target}`).find('.price').html(new_price);
  })

  $(document).on( 'change','.payment-selection--popup', function(){
    var new_price = $(this).find(':selected').data('price')

    
    var target = $(this).data('price-container')

    console.log(new_price)
    console.log(target)

    $(`#${target}`).find('.price').html(new_price);
  })

  // $('.payment-select').on('change', function() {
  //   var payment_method = $(this).val()
  //   var select = $(this).siblings(".product-item__subscribe")

  //   console.log(payment_method)

  //   if (payment_method == 0) {
  //     select.val([]);
  //     select.hide()
  //   } else {
  //     select[0].selectedIndex = 0;
  //     select.show()
  //   }

  //   console.log(select.val())
  // });

document.addEventListener('cart:updated', function() {

    $(".form-inquiry--popup-container.active").removeClass("active")
    $(".form-inquiry--popup-container.active .cart-notification").removeClass("active")
    $(".form-inquiry--overlay.active").removeClass("active")

    document.getElementById('mini-cart').open = true;
});