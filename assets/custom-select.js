function selectActivation() {
  const urlParams = new URLSearchParams(window.location.search);
  const productType = urlParams.get("filter.p.product_type");
  console.log(productType);
  const selectEl = document.querySelector("#custom-original-select");
  const options = selectEl.options;
  for (let p = 0; p < options.length; p++) {
    if (options[p].value == productType) {
      console.log(selectEl.selectedIndex);
      selectEl.selectedIndex = p;
    }
  }

  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    a.style.setProperty(
      "--icon",
      selElmnt.options[selElmnt.selectedIndex].dataset.icon
    );
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.style.setProperty("--icon", selElmnt.options[j].dataset.icon);
      c.setAttribute("data-icon", selElmnt.options[j].dataset.icon);
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.value = s.options[i].value;
            const checkboxes =
              document.querySelectorAll(`input[type=checkbox]`);
            let count = 0;
            checkbox: for (z = 0; z < checkboxes.length; z++) {
              checkboxes[z].checked = false;
              if (
                checkboxes[z].getAttribute("id") == `filter.p.product_type-${i}`
              ) {
                console.log(checkboxes[z]);
                checkboxes[z].click();
                count++;
                break checkbox;
              }
            }
            if (count == 0) {
              window.location.replace(window.location.pathname);
            }
            // $(`#filter.p.product_type-${i}`).click();
            h.innerHTML = this.innerHTML;
            h.style.setProperty("--icon", this.dataset.icon);
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

selectActivation();

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);