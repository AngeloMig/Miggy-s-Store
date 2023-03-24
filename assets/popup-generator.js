function Popup() {

    this.product = {}
    
    this.section = {
        id: ""
    };

    this.mediaBuilder = (product, media, section) => {

        const medias = media.map((m, index) => {        
            return `
        <div id="product-${ section.id }-${ m.id }" class="product__media-item  is-initial-selected is-selected" data-media-type="${ m.media_type }" data-media-id="${ m.id }" data-original-position="${ index }"><div class="product__media-image-wrapper aspect-ratio aspect-ratio--natural" style="padding-bottom: 100.0%; --aspect-ratio: 1.0">
                          <img reveal="" loading="lazy" sizes="(max-width: 999px) calc(100vw - 48px), 640px" height="${ m.height }" width="${ m.width }" alt="${m.alt}" src="${m.src}" style='opacity:1'>
                        </div></div>
        `}).join(' ')

            return medias;
    }

    this.mediaBuilder_buttons = (media, section) => {

        const medias = media.map((m, index) => {   
            return `
            <button type="button" tabindex="-1" class="dots-nav__item  tap-area" aria-controls="product-${ section.id }-${ m.id }" data-media-id="${ m.id }" data-action="select">
                <span class="visually-hidden">Go to slide ${index + 1}</span>
            </button>`
        }).join(' ')

        return medias;
    }

    this.mediaBuilder_scrollShadow = (media, section) => {

        const medias = media.map((m, index) => {   

            return `
            <button
              type="button"
              tabindex="-1"
              reveal=""
              class="product__thumbnail-item hidden-pocket"
              aria-current="true"
              aria-controls="product-${ section.id }-${ m.id }"
              data-media-id="${ m.id }"
              data-action="select"
              style="opacity: 1"
            >
              <div class="product__thumbnail">
                <img
                  loading="lazy"
                  sizes="(max-width: 999px) 72px, 60px"
                  height="2255"
                  width="2255"
                  alt="${ m.alt }"
                  src="${ m.preview_image.src }"
                />
              </div></button>
            `
        }).join(' ')

        return medias;
    }

    this.sellingPlanOptions = (product, plan, variant) => {

        if (plan && plan.selling_plans.length > 1) {        
         const options = plan.selling_plans.map((option, i) => {
             let priceLength = variant.selling_plan_allocations[i].price.toString().length;
             let decimal = variant.selling_plan_allocations[i].price.toString().substring(priceLength, priceLength - 2);
             let wholeNumber = variant.selling_plan_allocations[i].price.toString().substring(0, priceLength - 2);
             let arrange = wholeNumber.concat(".",decimal)
             return `
             <option value='${ option.id }' data-price="$${arrange}">${ option.name }</option>
             `
         })
         return `<div class="product-item__subscribe-container subscribe--small"><select name="selling_plan" type="button" class="button select-arrow payment-selection--popup" data-price-container="${product.id}--price--popup">
                 <option value="" selected="" disabled="">Subscribe &amp; save 10%</option>
                 <option value="" data-price="$${product.price}">One-time purchase</option>
                     ${options}
                 </select>
             </div>`
         } else {
             return '';
         }
    }


    this.htmlTemplate = (section,product) => {
        let priceLength = product.price.toString().length;
        let decimal = product.price.toString().substring(priceLength, priceLength - 2);
        let wholeNumber = product.price.toString().substring(0, priceLength - 2);
        let arrange = (wholeNumber.includes('.')) ? wholeNumber.concat("",decimal) : wholeNumber.concat(".",decimal)
        product.price = arrange

        return `
        <style>
  .form-inquiry {
    max-width: 800px;
    margin: 0 auto;
  }

  .form-inquiry--popup-container .section__header {
    margin-bottom: 30px;
  }

  .form-inquiry--footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    padding: 25px;
    margin-top: 26px;
    border-radius: 0 0 8px 8px;
  }

  .form-inquiry--footer span {
    font-weight: 600;
  }

  .form-inquiry--footer .button {
    color: black;
    background: white;
    box-shadow: 0px 0px 0px 1px rgb(var(--primary-button-background));
    margin-left: 20px;
    width: 202px;
  }

  .form-inquiry--footer .button svg {
    padding-right: 5px;
  }

  .form-inquiry--overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 20, 0.5);
    z-index: 99;
    display: none;
    opacity: 0;
    transition: 0.2s ease;
  }

  .product-form__description.rte {
    color: #313131;
    font-size:18px;
    padding-bottom: 25px;
  }

  .form-inquiry--popup-container {
    position: fixed;
    top: 5%;
    left: 50%;
    z-index: 100;
    background: #fff5ea;
    border-radius: 8px;
    transform: scale(0);
    transition: 0.2s ease;
    overflow-y: auto;
  }

  .form-inquiry--popup-container.active {
    transform: scale(1) translateX(-50%);
    padding: calc(var(--vertical-breather) / 2);
  }

  .form-inquiry--overlay.active {
    display: block;
    opacity: 100%;
  }

  .form-inqury--close-btn svg {
    width: 20px;
    height: 20px;
    color: #E2D2C1;
  }

  .form-inquiry--popup-container {
    top: 40px;
    border-radius: 0 !important;
    overflow-y: auto;
    height: 100vh;
    width: 100%;

    width: 70%;
  }

  .form-inquiry--popup-container p {
    font-size: 18px;
  }

  .form-inquiry--popup-container .container {
    padding: 40px;
  }

  .product-info--icons {
    margin-top: 2em;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width:80%;
  }

  .product-info--icons div {
    flex: 33%;
    text-align: center;
  }

  .product-info--icon-description {
    font-weight: bold;
    font-size: 12px !important;
    width: 80%;
    margin: 0 auto;
  }

  .form-inquiry--popup-container .cart-notification .container {
    padding:0 !important;
  }

  .form-inquiry--popup-container .cart-notification.active {
    opacity:1 !important;
  }

  @media screen and (max-width: 999px) {
    .form-inquiry--popup-container {
        height:0;
    }

    .form-inquiry--popup-container .container {
      padding: 20px;
      padding-top: 60px;
    }

    .form-inquiry--popup-container.active {
        height:100vh;
        border-radius: 30px 30px 0 0 !important;
        top: 116px !important;
        background-color: white;
    }
  }

</style>
        <cart-notification global="" hidden="" class="cart-notification cart-notification--fixed active" style="opacity:0; left:0;z-index:101;"></cart-notification>
        
            <button type="button" class="drawer__close-button tap-area form-inqury--close-btn" data-action="close" title="Close"><svg focusable="false" width="14" height="14" class="icon icon--close
          
            
          
        " viewBox="0 0 14 14">
              <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="1.5" fill="none"></path>
            </svg></button>
        
            <div class="product product--thumbnails-" style="grid-gap: 60px;">
        <product-media form-id="product-form-${ section.id }-${ product.id }" thumbnails-position="" reveal-on-scroll="" product-handle="${product.handle}" class="product__media became-visible" style="--largest-image-aspect-ratio: 1; opacity: 1;">
            <div class="product__media-list-wrapper" style="max-width: 4032px">
            <flickity-carousel click-nav="" flickity-config="{
                &quot;adaptiveHeight&quot;: true,
                &quot;dragThreshold&quot;: 10,
                &quot;initialIndex&quot;: &quot;.is-initial-selected&quot;,
                &quot;fade&quot;: false,
                &quot;draggable&quot;: &quot;>1&quot;,
                &quot;contain&quot;: true,
                &quot;cellSelector&quot;: &quot;.product__media-item:not(.is-filtered)&quot;,
                &quot;percentPosition&quot;: false,
                &quot;pageDots&quot;: false,
                &quot;prevNextButtons&quot;: false
              }" id="product-${ section.id }-${ product.id }-media-list" class="product__media-list">
              ${this.mediaBuilder(product,product.media, section)}
              </flickity-carousel></div>
              
            <flickity-controls controls="product-${ section.id }-${ product.id }-media-list" class="product__media-nav">
            <button class="product__media-prev-next  hidden-lap-and-up tap-area tap-area--large" aria-label="Previous" data-action="prev"><svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-left icon--direction-aware

            " viewBox="0 0 17 14">
            <path d="M17 7H2M8 1L2 7l6 6" stroke="currentColor" stroke-width="1.5" fill="none"></path>
            </svg></button><div class="dots-nav dots-nav--centered hidden-lap-and-up">
            
            ${this.mediaBuilder_buttons(product.media, section)}

        </div>
            

        <scroll-shadow class="product__thumbnail-scroll-shadow hidden-pocket">
        <div class="product__thumbnail-list hide-scrollbar">
          <div class="product__thumbnail-list-inner">
              ${this.mediaBuilder_scrollShadow(product.media, section)}
          </div>
        </div>
      </scroll-shadow>      


            <button class="product__media-prev-next  hidden-lap-and-up tap-area tap-aera--large" aria-label="Next" data-action="next"><svg focusable="false" width="17" height="14" class="icon icon--nav-arrow-right

            icon--direction-aware

            " viewBox="0 0 17 14">
            <path d="M0 7h15M9 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" fill="none"></path>
            </svg></button>
            </flickity-controls>              
              
              </product-media><div class="product-info--section"><style>
          .product__info--popup .price {
            font-size:30px;
            font-weight:bold;
            color:#313131;
          }
        
          .product__info--popup .product-meta {
            border-bottom:none;
            padding-bottom:0;
            
          }
        
          .product-form__description.rte span {
            color:#313131;
            font-size:18px !important;
          }
        
        </style><div class="product__info product__info--popup">
          <!-- PRODUCT META -->
          <product-meta form-id="product-form-${ section.id }-${ product.id }" price-class="price--large" class="product-meta">
              <h1 class="product-meta__title heading h1">${product.title}</h1>
            
        
            <div id="${product.id}--price--popup" class="product-meta__price-list-container" role="region" aria-live="polite">
              <div class="price-list" data-product-price-list=""><span class="price price--large">
                    <span class="visually-hidden">Sale price</span>$${product.price}</span></div>
        
              <div class="product-meta__label-list label-list" data-product-label-list=""></div>
            </div><product-payment-terms form-id="product-form-${ section.id }-${ product.id }"><form method="post" action="/cart/add" id="product-installment-form-${section.id}-${product.id}" accept-charset="UTF-8" class="shopify-product-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="${ product.variants[0].id }"></form></product-payment-terms></product-meta><div class="product-form"><div class="product-form__description rte">${product.description}</div><form method="post" action="/cart/add" accept-charset="UTF-8" class="shopify-product-form" enctype="multipart/form-data" is="product-form"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><span style="font-size:18px;font-weight:bold">Quantity:</span>
            <div class="product-form__quantity" style="justify-content:flex-start">
              <quantity-selector class="quantity-selector">
                <button type="button" class="quantity-selector__button">
                  <span class="visually-hidden">Decrease quantity</span><svg focusable="false" width="10" height="2" class="icon icon--minus-big
          
          
          
        " viewBox="0 0 10 2">
              <path fill="currentColor" d="M0 0h10v2H0z"></path>
            </svg></button>
        
                <input type="text" is="input-number" class="quantity-selector__input" inputmode="numeric" name="quantity" autocomplete="off" min="1" value="1" size="2" aria-label="Quantity">
        
                <button type="button" class="quantity-selector__button">
                  <span class="visually-hidden">Increase quantity</span><svg focusable="false" width="10" height="10" class="icon icon--plus-big
          
          
          
        " viewBox="0 0 10 10">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6v4h2V6h4V4H6V0H4v4H0v2h4z" fill="currentColor"></path>
            </svg></button>
              </quantity-selector>
        
              <script>
                console.log("5 Pizza Combo")
              </script><input type="hidden" name="id" value="${product.variants[0].id}">
                <button type="submit" is="loader-button" class="product-item__cta button button--primary" style="min-width:auto">
              <span class="loader-button__text">
                  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>mi:shopping-cart-add</title>
              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Product-Grid" transform="translate(-209.000000, -472.000000)">
                      <g id="Group-4" transform="translate(31.000000, 461.000000)">
                          <g id="Group-3" transform="translate(144.000000, 0.000000)">
                              <g id="mi:shopping-cart-add" transform="translate(34.000000, 11.000000)">
                                  <rect id="ViewBox" x="0" y="0" width="22" height="22"></rect>
                                  <path d="M5.609,14.7224447 L3.9269,3.80013715 L2.9,3.80013715 C2.40294373,3.80013715 2,3.39719684 2,2.90014477 C2,2.40309271 2.40294373,2.00015239 2.9,2.00015239 L4.6865,2.00015239 C4.90361997,1.99614406 5.11477166,2.07132622 5.2805,2.2116506 C5.45060406,2.35469247 5.56156834,2.55577344 5.5919,2.77594583 L5.8871,4.70012953 L12.8,4.70012953 L12.8,6.5001143 L6.1643,6.5001143 L7.2713,13.7000533 L15.7304,13.7000533 L17.0804,9.20009144 L18.9596,9.20009144 L17.2622,14.8583435 C17.1480913,15.2392053 16.7975914,15.5001898 16.4,15.5000381 L6.5144,15.5000381 C6.29112606,15.5041501 6.07440221,15.4245248 5.9069,15.27684 C5.7436525,15.1341609 5.63752371,14.9372489 5.6081,14.7224447 L5.609,14.7224447 Z M9.2,18.2000152 C9.2,19.1941194 8.39411255,20 7.4,20 C6.40588745,20 5.6,19.1941194 5.6,18.2000152 C5.6,17.2059111 6.40588745,16.4000305 7.4,16.4000305 C8.39411255,16.4000305 9.2,17.2059111 9.2,18.2000152 Z M17.3,18.2000152 C17.3,19.1941194 16.4941125,20 15.5,20 C14.5058875,20 13.7,19.1941194 13.7,18.2000152 C13.7,17.2059111 14.5058875,16.4000305 15.5,16.4000305 C16.4941125,16.4000305 17.3,17.2059111 17.3,18.2000152 Z M17.3,2.00015239 C17.7970563,2.00015239 18.2,2.40309271 18.2,2.90014477 L18.2,3.80013715 L19.1,3.80013715 C19.5970563,3.80013715 20,4.20307747 20,4.70012953 C20,5.1971816 19.5970563,5.60012192 19.1,5.60012192 L18.2,5.60012192 L18.2,6.5001143 C18.2,6.99716636 17.7970563,7.40010668 17.3,7.40010668 C16.8029437,7.40010668 16.4,6.99716636 16.4,6.5001143 L16.4,5.60012192 L15.5,5.60012192 C15.0029437,5.60012192 14.6,5.1971816 14.6,4.70012953 C14.6,4.20307747 15.0029437,3.80013715 15.5,3.80013715 L16.4,3.80013715 L16.4,2.90014477 C16.4,2.40309271 16.8029437,2.00015239 17.3,2.00015239 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
                </span>
              <span class="loader-button__loader" hidden="">
                <div class="spinner">
                  <svg focusable="false" width="24" height="24" class="icon icon--spinner" viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
                  </svg>
                </div>
              </span>
            </button>
            </div>
                  
                    ${this.sellingPlanOptions(product, product.selling_plan_groups[0], product.variants[0])}
            
        </form><form method="post" action="/cart/add" id="product-form-${ section.id }-${ product.id }" accept-charset="UTF-8" class="shopify-product-form" enctype="multipart/form-data" is="product-form"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="${product.id}"></form></div></div><div class="product-info--icons">
                  <div><svg width="56px" height="56px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>DIY</title>
              <g id="Desktop-Version-Final" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Product-Popup" transform="translate(-682.000000, -597.000000)">
                      <g id="Group-8" transform="translate(650.000000, 597.000000)">
                          <g id="DUY" transform="translate(32.000000, 0.000000)">
                              <rect id="ViewBox" x="0" y="0" width="56" height="56"></rect>
                              <path d="M11.6666667,49 C10.3833333,49 9.28433333,48.5434444 8.36966667,47.6303333 C7.45655556,46.7156667 7,45.6166667 7,44.3333333 L7,11.6666667 C7,10.3833333 7.45655556,9.28433333 8.36966667,8.36966667 C9.28433333,7.45655556 10.3833333,7 11.6666667,7 L44.3333333,7 C45.6166667,7 46.7156667,7.45655556 47.6303333,8.36966667 C48.5434444,9.28433333 49,10.3833333 49,11.6666667 L49,44.3333333 C49,45.6166667 48.5434444,46.7156667 47.6303333,47.6303333 C46.7156667,48.5434444 45.6166667,49 44.3333333,49 L11.6666667,49 Z M11.6666667,28 L11.6666667,44.3333333 L44.3333333,44.3333333 L44.3333333,28 L39.6666667,28 L39.6666667,39.6666667 L16.3333333,39.6666667 L16.3333333,28 L11.6666667,28 Z M21,35 L35,35 L35,28 L21,28 L21,35 Z M11.6666667,23.3333333 L44.3333333,23.3333333 L44.3333333,11.6666667 L11.6666667,11.6666667 L11.6666667,23.3333333 Z M18.6666667,18.6666667 C18.0055556,18.6666667 17.451,18.4434444 17.003,17.997 C16.5565556,17.549 16.3333333,16.9944444 16.3333333,16.3333333 C16.3333333,15.6722222 16.5565556,15.1176667 17.003,14.6696667 C17.451,14.2232222 18.0055556,14 18.6666667,14 C19.3277778,14 19.8823333,14.2232222 20.3303333,14.6696667 C20.7767778,15.1176667 21,15.6722222 21,16.3333333 C21,16.9944444 20.7767778,17.549 20.3303333,17.997 C19.8823333,18.4434444 19.3277778,18.6666667 18.6666667,18.6666667 Z M28,18.6666667 C27.3388889,18.6666667 26.7851111,18.4434444 26.3386667,17.997 C25.8906667,17.549 25.6666667,16.9944444 25.6666667,16.3333333 C25.6666667,15.6722222 25.8906667,15.1176667 26.3386667,14.6696667 C26.7851111,14.2232222 27.3388889,14 28,14 C28.6611111,14 29.2156667,14.2232222 29.6636667,14.6696667 C30.1101111,15.1176667 30.3333333,15.6722222 30.3333333,16.3333333 C30.3333333,16.9944444 30.1101111,17.549 29.6636667,17.997 C29.2156667,18.4434444 28.6611111,18.6666667 28,18.6666667 Z M37.3333333,18.6666667 C36.6722222,18.6666667 36.1184444,18.4434444 35.672,17.997 C35.224,17.549 35,16.9944444 35,16.3333333 C35,15.6722222 35.224,15.1176667 35.672,14.6696667 C36.1184444,14.2232222 36.6722222,14 37.3333333,14 C37.9944444,14 38.5482222,14.2232222 38.9946667,14.6696667 C39.4426667,15.1176667 39.6666667,15.6722222 39.6666667,16.3333333 C39.6666667,16.9944444 39.4426667,17.549 38.9946667,17.997 C38.5482222,18.4434444 37.9944444,18.6666667 37.3333333,18.6666667 Z" id="Shape" fill="#ED1C24" fill-rule="nonzero"></path>
                          </g>
                      </g>
                  </g>
              </g>
            </svg><p class="product-info--icon-description">Delicious DIY Pizza</p>
                  </div>
        
                  <div><svg width="54px" height="56px" viewBox="0 0 54 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>fluent:food-pizza-24-regular</title>
              <g id="Desktop-Version-Final" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Product-Popup" transform="translate(-841.000000, -597.000000)">
                      <g id="Group-7" transform="translate(808.000000, 597.000000)">
                          <g id="fluent:food-pizza-24-regular" transform="translate(33.000000, 0.000000)">
                              <rect id="ViewBox" x="0" y="0" width="54" height="56"></rect>
                              <path d="M19.9975218,24.1665931 C21.238579,24.1665931 22.2446547,23.1622472 22.2446547,21.9233238 C22.2446547,20.6844004 21.238579,19.6800545 19.9975218,19.6800545 C18.7564646,19.6800545 17.7503889,20.6844004 17.7503889,21.9233238 C17.7503889,23.1622472 18.7564646,24.1665931 19.9975218,24.1665931 Z M31.2331863,28.6486452 C31.2331863,29.8875686 30.2271107,30.8919144 28.9860534,30.8919144 C27.7449962,30.8919144 26.7389205,29.8875686 26.7389205,28.6486452 C26.7389205,27.4097217 27.7449962,26.4053759 28.9860534,26.4053759 C30.2271107,26.4053759 31.2331863,27.4097217 31.2331863,28.6486452 Z M19.9975218,37.6172358 C21.238579,37.6172358 22.2446547,36.6128899 22.2446547,35.3739665 C22.2446547,34.1350431 21.238579,33.1306972 19.9975218,33.1306972 C18.7564646,33.1306972 17.7503889,34.1350431 17.7503889,35.3739665 C17.7503889,36.6128899 18.7564646,37.6172358 19.9975218,37.6172358 Z M11.0089901,9.96669844 C11.0089901,6.61076757 13.7729636,3.67657133 17.345905,4.02876461 C28.9798812,5.17933472 39.7584224,10.6441898 47.5518655,19.3435641 C49.9562977,22.0197844 49.2080025,25.9926143 46.4754889,27.9689346 C42.5170033,30.8333172 38.5598019,33.6994679 34.6038857,36.5673858 C34.5993914,37.5476945 34.5993914,38.1847829 34.6016386,39.0147926 L34.6016386,40.425809 C34.6022775,41.5874439 34.0875356,42.6897151 33.195885,43.4360977 C32.3042345,44.1824803 31.1272419,44.4963256 29.9815333,44.2932052 C29.5231182,46.1461457 27.8872054,47.7186774 25.6131069,47.7186774 C24.0401139,47.7186774 22.7772252,46.9671822 21.9974701,45.890413 L19.020019,48.0349784 C15.6762852,50.4464929 10.9977545,48.0618977 11.0000008,43.941012 L11.0089901,9.96669844 Z M17.0133293,7.37796567 C15.6448253,7.24336952 14.3751952,8.37173397 14.3751952,9.97118498 L14.3751952,11.137685 C25.7893049,11.6139935 36.4348823,17.0107008 43.5542161,25.9298028 L44.4957648,25.2478489 C45.7946076,24.3056758 45.9608954,22.616494 45.0395709,21.5913199 C37.8097218,13.5187766 27.8097726,8.44695072 17.0155764,7.37796567 L17.0133293,7.37796567 Z M14.3684539,43.9432552 C14.3684539,45.3183793 15.9279641,46.1147399 17.042542,45.3116495 L21.8244408,41.8682311 C22.3381346,41.4992986 23.0155622,41.4487266 23.5785088,41.7372847 C24.1414555,42.0258428 24.495035,42.6048937 24.4940347,43.2366254 C24.4940347,43.8423081 24.9636855,44.35826 25.6108598,44.35826 C25.9101745,44.3612718 26.1981727,44.2442127 26.4102529,44.0333406 C26.6223331,43.8224685 26.7407425,43.5354351 26.7389205,43.2366254 L26.7389205,40.4213224 C26.7389205,39.4921299 27.4934773,38.7388705 28.4242702,38.7388705 C29.3550631,38.7388705 30.1096199,39.4921299 30.1096199,40.4213224 C30.1096199,40.7376234 30.3590516,40.984383 30.6669088,40.984383 C30.9771732,40.984383 31.2286921,40.7332965 31.2286921,40.4235657 L31.2286921,39.0282522 C31.2264449,37.9739156 31.2241978,37.2156906 31.2399277,35.6880242 C31.2441506,35.1552825 31.500881,34.6560183 31.9320447,34.3420626 C33.9589586,32.870478 37.5408884,30.2772587 40.8217025,27.9038797 C34.3404194,19.8547717 24.7071544,14.9737031 14.3729481,14.502589 L14.3729481,43.9432552 L14.3684539,43.9432552 Z" id="Shape" fill="#ED1C24" fill-rule="nonzero"></path>
                          </g>
                      </g>
                  </g>
              </g>
            </svg><p class="product-info--icon-description">Click &amp; Collect From Marrickville</p>
                  </div>
        
                <div>
                  <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTQiIGhlaWdodD0iNTYiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PGRlZnM+PHBhdGggaWQ9IkEiIGQ9Ik0wIDBoNTJ2NDBIMHoiLz48cGF0aCBpZD0iQiIgZD0iTTAgMGgxNXYxNUgweiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgOCkiPjxtYXNrIGlkPSJDIiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNBIi8+PC9tYXNrPjxwYXRoIGQ9Ik00Mi42NjQgMzMuNzIzaC0zLjIxM2MuNjM1IDEuMTAzIDIuNTE2IDEuMTA3IDMuMjEzIDB6TTM2IDMzLjY5M2MuMTczIDIuMTA0IDIuODIzIDQuMTE3IDUuMTk3IDMuOTkzIDIuNDE1LS4xMjYgNC45NTUtMi4xODQgNC44ODctMy45Ni0uNzM2LS4wOTMtLjczNi0uMDkzLTEuMDAzLjUyNy0uODAyIDEuODYtMi44NDYgMi45MzgtNC44NTEgMi41MzgtMS42MDctLjMyLTIuNy0xLjI2OC0zLjI4OC0yLjc3My0uMTAzLS4yNjYtLjIzMS0uMzU0LS40OTQtLjMyOC0uMTQ3LjAxNS0uMjk2LjAwMy0uNDQ4LjAwM3pNMTMuNjA2IDIuNDMzbC4wMTIgMi43NzhjLjAwMS4wNzUuMTY4LjIxLjI2LjIxMWw0LjQ0OS4wMTNjLjIzNS4wMDIuMzEzLS4wODcuMzA4LS4zMWwtLjAwNC0xLjI4MmMtLjAwOC0uNTM3LS4yMTctLjc4Ny0uNzUtLjg2N2wtMS45Ni0uMjYtMi4zMTUtLjI4M3pNMzYuOTYgMTcuMzY0aDEyLjIxbC4yMjguMDAxYy4xOTYuMDE3LjI3NC0uMDcuMjctLjI2MnYtLjkwNGMtLjAwMi0uNTEzLS4wMDItLjUxNC0uNTE4LS41MTRIMzcuNDg3Yy0uMTAyIDAtLjIxNy0uMDI5LS4zLjAxLS4wOTIuMDQxLS4yMTQuMTQzLS4yMTguMjIzbC0uMDEgMS40NDZ6bS4wMi0zLjk4MmgxMi4xNjNjLjUyNCAwIC41MjQgMCAuNTI1LS41Mzh2LS42NGMwLS40OTUgMC0uNDk3LS40OTQtLjQ5N0gzNy40MzZjLS4xNDggMC0uMjk2LjAxOC0uNDU3LjAyN3YxLjY0OHptLS4wMjItNS42NDZWOC45MmMwIC40OTMgMCAuNDk0LjQ5Ny40OTRoMTEuNzE0Yy4wNzYgMCAuMTcuMDI3LjIyNC0uMDA4LjEwMy0uMDY4LjI1LS4xNjQuMjYxLS4yNi4wMzQtLjMxMS0uMDEyLS42My4wMjEtLjk0MS4wNDMtLjM5Mi0uMTA5LS40NzktLjQ4Ny0uNDc3bC0xMS43NTIuMDA4aC0uNDc4em0uNDIgMTMuMjZoOS4zOWMuNjYgMCAuOTkyLS4yMjguOTgyLS42NzMtLjAxLS40MjgtLjM0NC0uNjUzLS45NzEtLjY1M0gyNy45NmMtLjEzOSAwLS4yODEtLjAwNi0uNDE2LjAyLS4zMjYuMDY1LS41NjQuMzcxLS41NDYuNjhhLjY4LjY4IDAgMCAwIC42MS42MThjLjEyNi4wMTMuMjUzLjAwOC4zOC4wMDhoOS4zOXptLTMuNDMyIDIuMzNIMjlsLjE1OC40NTMgMS4xMiAyLjg4Yy41MSAxLjQtLjQ2OSAyLjgwMi0xLjk2OSAyLjgxM2wtNi4wODMuMDA4Yy0uOTE0LS4wMDMtMS41NzQtLjQzOC0xLjk1NS0xLjI1NGwtMy4yMTYtNi45NDZhNC44OCA0Ljg4IDAgMCAxLS4zNS0zLjEyOWwxLjU0NS03LjA2M2MuMjUtMS4wOTUuNDA4LTIuMTg4LjMxNS0zLjMyM2gtMS42ODlsLjAwMSAxLjI2NGE0LjAyMyA0LjAyMyAwIDAgMS0uNDM0IDEuODUzbC0zLjk2IDguMDU1Yy0uNTk4IDEuMjM2LTEuNTYyIDEuODYyLTIuOTMgMS45MjItLjY1LjAyOC0xLjExMi40ODYtMS4xNzIgMS4xMi0uMDI1LjI2LjAyOC4zOTUuMzQ2LjQ0MyA0LjUxLjY2OCA3Ljk4NyA0LjAyOCA4Ljc3IDguNDc4LjA2Ny4zODMuMTg5LjQ5NC41OTEuNDk0bDI5Ljk2My0uMDExYy4xMTQgMCAuMjI5LjAwNC4zNDItLjAwNC43MzctLjA1MiAxLjM2MS0uNzM3IDEuMjYtMS40My0uMjI0LTEuNTI2LS42MjctMy0xLjQxMi00LjM0Ny0uNDgxLS44MjYtMS4wNzQtMS41NjItMS45MTYtMi4wNWExLjgyNSAxLjgyNSAwIDAgMC0uODUtLjI0MWwtNC45ODItLjAwOWMtLjY4My4wMDMtMS4zNy0uMDAyLTIuMDUuMDYtMS41NjYuMTQzLTIuNjM0Ljk1Mi0zLjE0MiAyLjQ0NC0uMzIxLjk0My0uMzg1IDEuOTE2LS4yOTUgMi45MDIuMDY0LjY5Ny0uMzM1IDEuMjI3LTEuMDAyIDEuMzE2YTEuMTIgMS4xMiAwIDAgMS0xLjI5NS0xLjAyOGMtLjE4My0xLjU3NiAwLTMuMTA5LjY0Ni00LjU3LjE2LS4zNjMuMzc2LS43MDMuNTktMS4xem0xNC45NzktLjY0M2MxLjc2IDEuODgzIDIuNTQyIDQuMTUgMi45ODUgNi41NzIuMzkxIDIuMTQ0LS44NzEgMy45ODQtMy4wMzQgNC4zNzMtLjI1LjA0NS0uMzQ4LjE0My0uNDA0LjM5LS44MDMgMy41NDgtMy43NDcgNS45Mi03LjQwNSA1Ljk4MS0zLjUuMDU4LTYuNzA0LTIuNDg5LTcuNDE2LTUuOTE3LS4wNjYtLjMxOS0uMTgzLS4zOTUtLjQ5NC0uMzk1bC0xNi4zMTUuMDA2Yy0xLjAwMSAwLTEuNDkyLS40ODItMS41MzctMS40NjNhNy4zMzggNy4zMzggMCAwIDAtLjEyLTEuMDg1QzE0IDI1LjE1NSA2Ljg0MyAyMi41ODggMi4wNTggMjYuNDM4Yy0uMzA5LjI0Ny0uNjMuNDMxLTEuMDM3LjM3Mi0uNDgtLjA3LS44MjMtLjMzMy0uOTYyLS43OTgtLjE0Ny0uNDktLjAxOC0uOTE3LjM4Mi0xLjI1NGExMC4zMSAxMC4zMSAwIDAgMSA0LjE1NC0yLjExNSA4LjM2NiA4LjM2NiAwIDAgMSAxLjExNy0uMjE3Yy4yNi0uMDMuMzI2LS4xMjcuMzM4LS4zNzYuMDcxLTEuNTkzLjkyNi0yLjgwNCAyLjMzNy0zLjI5MmE0LjExMiA0LjExMiAwIDAgMSAxLjA3Ni0uMmMuNDQzLS4wMjguNzE1LS4yMS45MS0uNjFsMy44MjMtNy43NDZjLjQwOS0uNzk4LjMzMi0xLjU5NC4zMzgtMi40NjZoLTEuNzI4Yy0uOTkyLS4wMDMtMS41MjctLjUzNS0xLjUyNy0xLjUxNHYtNC43NWMuMDAzLS45OTEuNjA3LTEuNTcxIDEuNTktMS40NThsNS41NC43MDdjMS40OTUuMjIxIDIuNTE2IDEuNDc1IDIuNTUgMy4wMjkuMDEzLjUzOC4wMDMgMS4wNzguMDAzIDEuNjc3LjUwNyAwIC45ODQuMDEzIDEuNDYtLjAxLjA5OS0uMDA1LjIwOC0uMTI5LjI4NS0uMjJsMS4zNzUtMS42NmMuNDUyLS41NTUgMS4wMzEtLjgyOSAxLjc1Mi0uODI2bDQuMjYuMDAzYy43NDQuMDAyIDEuMjMzLjQ1OCAxLjIzOSAxLjEzNnMtLjQ4MiAxLjE2LTEuMjIgMS4xNjhjLTEuMzA1LjAxNS0yLjYxMS0uMDA1LTMuOTE3LjAxNWEuNzcuNzcgMCAwIDAtLjUwNS4yMzFjLS40Ny41MjYtLjkxNiAxLjA3NS0xLjM1NyAxLjYyNS0uNDY5LjU4NC0xLjA3Ny44NTMtMS44Mi44NDgtLjQzMi0uMDAzLS44NjMuMDA1LTEuMjk0LS4wMDMtLjE5Ny0uMDAzLS4zMTIuMDQzLS4zMDIuMjcuMTEzIDIuNDktLjc1OCA0LjgyMS0xLjIwMSA3LjIyMS0uMjEgMS4xMzYtLjQ4IDIuMjYtLjcyOCAzLjM4OGEyLjY1IDIuNjUgMCAwIDAgLjE5NyAxLjcyOGwzLjA1IDYuNTY3Yy4wNTYuMTE4LjIyNi4yNTkuMzQ0LjI2bDUuMjEtLjAwMmMuMDM2IDAgLjA3Mi0uMDE5LjE1NC0uMDQyLS4wNDQtLjEzLS4wODEtLjI1OC0uMTMtLjM4bC0xLjM1LTMuNDM4YTEuMDEyIDEuMDEyIDAgMCAwLS4zNy0uNDQzYy0xLjE1NS0uNzQyLTEuNjc3LTIuMDQ5LTEuMzA4LTMuMzM2LjM3LTEuMjk2IDEuNTI5LTIuMTU5IDIuOTE0LTIuMTYxbDYuNDI3LS4wMDJoLjQ5OXYtNi4wNDhsLjAwMS00LjMzYy4wMDMtMS4wMTcuNTQ3LTEuNTUzIDEuNTc2LTEuNTUzaDE0LjI2MmMuOTY4IDAgMS41MzMuNTU1IDEuNTMgMS41MjZsLS4wNCAzLjU3Ni4wNDEgMy4yNzYuMDAyIDQuMTM3YzAgMS4yMTItLjQ3MyAxLjY5NS0xLjY4IDEuNzIzLS4wNzYuMDAyLS4xNS4wMS0uMzAyLjAyMS4yMDUgMS4xODMtLjE0MyAyLjE4Mi0xLjA5MiAyLjk5eiIgZmlsbD0iI2VkMWMyNCIgbWFzaz0idXJsKCNDKSIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDMzKSI+PG1hc2sgaWQ9IkQiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI0IiLz48L21hc2s+PHBhdGggZD0iTTEyLjY4NSA3LjUyOWMuMDIyLTIuODExLTIuMjgxLTUuMTQ0LTUuMTAyLTUuMTctMi44OTItLjAyNS01LjI0NyAyLjI0NS01LjI2OCA1LjA3OC0uMDIyIDIuODUgMi4yOTIgNS4xOCA1LjE1OSA1LjE5NiAyLjg0NS4wMTYgNS4xODktMi4yOCA1LjIxLTUuMTA0TTcuNDg1IDE1QzMuMzA0IDE0Ljk4NS0uMDIgMTEuNjA3IDAgNy4zOS4wMiAzLjI1NiAzLjQwOC0uMDE4IDcuNjQ3IDAgMTEuNzA1LjAxOCAxNS4wMTMgMy40MDggMTUgNy41MzdjLS4wMTMgNC4xMjMtMy4zOTEgNy40NzgtNy41MTYgNy40NjMiIGZpbGw9IiNlZDFjMjQiIG1hc2s9InVybCgjRCkiLz48L2c+PHBhdGggZD0iTTguNDkgNDEuODQ1Yy43NS4wMDMgMS4zODEtLjU5NiAxLjM5My0xLjMyMi4wMTItLjczMi0uNjM0LTEuMzY0LTEuMzkzLTEuMzY0LS43MzQgMC0xLjM3NC42MjYtMS4zNzUgMS4zNDdzLjYzIDEuMzM2IDEuMzc1IDEuMzM5TTguNTA1IDQ0QTMuNDkyIDMuNDkyIDAgMCAxIDUgNDAuNTAzQzUgMzguNTczIDYuNTg2IDM2Ljk5IDguNTEgMzdBMy41MTYgMy41MTYgMCAwIDEgMTIgNDAuNDkgMy40OTQgMy40OTQgMCAwIDEgOC41MDUgNDQiIGZpbGw9IiNlZDFjMjQiLz48L2c+PC9zdmc+" />
                  <p class="product-info--icon-description">Delivering to Sydney &amp; Surrounds</p>
                  </div>
                </div>
        
              </div>
            </div>
        
        `
    }

    this.popupGenerator = () => {
        const popup = this.htmlTemplate(this.section, this.product)
        const popupContainer = $(".form-inquiry--popup-container:not(.address-checker)")[0];
        $(popupContainer).html(popup);
        $(popupContainer).toggleClass("active");
    }

    this.setData = (product, sectionId) => {
        this.product = product;
        this.section.id = sectionId;
    }

}


$("product-item.form-popup .product-item__image-wrapper").on("click", function(e){

    const product_item = $(this).closest('product-item')

    const productId = product_item.data("product-id")
    const sectionId = product_item.data("section-id")
    const productData = Shopify.collectionProducts.find(product => product.id == productId)
    const popup = new Popup()
    popup.setData(productData, sectionId)
    popup.popupGenerator();
})

console.log("READY!!!!! || POPUP GENERATOR SCRIPT")

// $(".form-popup .product-item__image-wrapper").on("click", function (e) {

//     console.log(e.target.localName)

//     // let form ='';
//     // if (e.target.localName == 'img') {
//     //   form = $(e.target).parent().parent().siblings('.form-inquiry--popup-container');
//     // } else {
//     //   form = $(e.target).parent().parent().parent().siblings('.form-inquiry--popup-container');
//     // }

//     //   $(form).addClass('active');
//     //   $(form).find('.cart-notification').addClass('active');
//     //   $("html").addClass('lock-all');
// });