/*.
 * Copyright (C) 2017 Oleg E. Kurchenko Rostov-on-Don
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Forms() {
    function randomString(string_length) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    this.cleanSelect = function (selectbox)
    {
        for (var i = selectbox.options.length - 1; i >= 0; i--)
        {
            selectbox.remove(i);
        }
    };
    function sortSelect(selElem) {
        var tmpAry = new Array();
        var sels = new Array();
        for (var i = 0; i < selElem.options.length; i++) {
            tmpAry[i] = new Array();
            tmpAry[i][0] = selElem.options[i].text;
            tmpAry[i][1] = selElem.options[i].value;
            if (selElem.options[i].selected) {
                var ov = selElem.options[i].value;
                //var v = isNumeric(ov) ? parseInt(ov) : ov;
                sels.push(ov);
            }
        }
        tmpAry.sort();
        while (selElem.options.length > 0) {
            selElem.options[0] = null;
            //selElem.options.splice(0, 1);
        }
        for (var i = 0; i < tmpAry.length; i++) {
            var op = new Option(tmpAry[i][0], tmpAry[i][1]);
            selElem.options[i] = op;
        }
        //restore selects
        for (var i = 0; i < sels.length; i++) {
            for (var j = 0; j < selElem.length; j++) {
                if (selElem.options[j].value === sels[i]) {
                    selElem.options[j].selected = true;
                    break;
                }
            }
        }
        return;
    }

    function isNumeric(num) {
        return (typeof (num) === "number");//!isNaN(num);
    }

    function getSelectValues(select) {
        var result = new Array();
        var options = select && select.options;
        var opt;
        for (var i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];
            if (opt.selected) {
                //var sv = opt.value || opt.text;
                var ov = opt.value;
                var v = isNumeric(ov) ? parseInt(ov) : ov;
                result.push(v);
            }
        }
        return result;
    }

    function bindDomElemToObjProp(element, obj, propertyName, callback) {
        element.observe('change', function (event) {
            if (element.tagName.toUpperCase() === "SELECT") {
                //var selval = element.options[element.selectedIndex].value;
                //obj[propertyName] = isNumeric(selval) ? parseInt(selval) : selval;
                var selval;
                if (element.multiple) {
                    selval = getSelectValues(element);
                    obj[propertyName] = selval;
                } else {
                    selval = element.options[element.selectedIndex].value;
                    obj[propertyName] = isNumeric(selval) ? parseInt(selval) : selval;
                }
            } else if (element.tagName.toUpperCase() === "TEXTAREA") {
                obj[propertyName] = element.value;
            } else if (element.tagName.toUpperCase() === "INPUT") {
                if (element.readAttribute('type').toUpperCase() === 'CHECKBOX') {
                    obj[propertyName] = element.checked;
                } else {
                    obj[propertyName] = element.value;
                }
            } else if (element.tagName.toUpperCase() === "RADIO-LIST") {
                obj[propertyName] = element.value;
            }
            if (callback) {
                callback(element, obj, propertyName);
            }
        });
    }

    function createFormElement(form, values, desc, sels, newid) {
        var div = document.createElement("div");
        div.addClassName('FormElementLine' + newid);

        let title = document.createElement("label");
        title.innerHTML = desc.title;
        title.addClassName('FormElementTitle' + newid);

        div.appendChild(title);
        form.appendChild(div);

        var field = null;
        var fieldid = newid + "-" + randomString(5);

        if (sels) {
            switch (desc.type) {
                case 'select':
                    field = document.createElement("select");
                    field.size = "5";
                    break;
                case 'dropdown':
                    field = document.createElement("select");
                    break;
                case 'multiple':
                    field = document.createElement("select");
                    field.multiple = "multiple";
                    field.size = "5";
                    break;
                case 'radio':
                    field = document.createElement("radio-list");
                    field.name = newid;
                    break;
            }
            for (var i = 0; i < sels.length; i++) {
                var option = document.createElement("option");
                option.value = sels[i].id;
                option.text = sels[i].name;
                if (sels[i].id === 0) {
                    //option.disabled=true;
                }
                field.appendChild(option);
            }
            if (field instanceof HTMLSelectElement) {
                sortSelect(field);
            }
            div.appendChild(field);
            switch (desc.type) {
                case 'select':
                    //field.value = isNumeric(values) ? parseInt(values) : values;
                    field.value = (typeof (values) === "number") ? parseInt(values) : values;
                    break;
                case 'dropdown':
                    //field.value = isNumeric(values) ? parseInt(values) : values;
                    field.value = (typeof (values) === "number") ? parseInt(values) : values;
                    break;
                case 'multiple':
                    if (Array.isArray(values)) {
                        var vals = values;
                        for (var i = 0, l = field.options.length; i < l; i++) {
                            var o = field.options[i];
                            if (vals.indexOf(isNumeric(o.value) ? parseInt(o.value) : o.value) !== -1) {
                                o.selected = true;
                            }
                        }
                    }
                    break;
                case 'radio':
                    //field.checked = isNumeric(values) ? parseInt(values) : values;
                    field.checked = (typeof (values) === "number") ? parseInt(values) : values;
                    break;
            }
        } else {
            switch (desc.type) {
                case 'boolean':
                    field = document.createElement("input");
                    field.setAttribute("type", "checkbox");
                    div.appendChild(field);
                    field.checked = values;
                    break;
                case 'integer':
                    field = document.createElement("input");
                    field.setAttribute("type", "text");
                    div.appendChild(field);
                    field.value = values;
                    break;
                case 'float':
                    field = document.createElement("input");
                    field.setAttribute("type", "text");
                    div.appendChild(field);
                    field.value = values;
                    break;
                case 'string':
                    field = document.createElement("input");
                    field.setAttribute("type", "text");
                    div.appendChild(field);
                    field.value = values;
                    break;
                case 'password':
                    field = document.createElement("input");
                    field.setAttribute("type", "password");
                    div.appendChild(field);
                    field.value = values;
                    break;
                case 'text':
                    field = document.createElement("textarea");
                    div.appendChild(field);
                    field.cols = "40";
                    field.rows = "3";
                    field.setStyle({'height': '150px'});
                    field.value = values;
                    break;
                case 'date'://2025-03-24
                    field = document.createElement("input");
                    field.setAttribute("type", "date");
                    field.value = values;
                    div.appendChild(field);
                    break;
                case 'datetime'://2025-03-31T10:44:46
                    field = document.createElement("input");
                    field.setAttribute("type", "datetime-local");
                    field.value = values;
                    div.appendChild(field);
                    break;
                case "time"://10:44:46
                    field = document.createElement("input");
                    field.setAttribute("type", "time");
                    div.appendChild(field);
                    field.value = values;
                    break;
            }
        }
        if (field !== null) {
            field.id = fieldid;
            field.baseid = newid;
            field.name = desc.name;
            field.addClassName('FormElementField' + newid);
            if (!desc.iseditable) {
                field.disabled = true;
            } else {
            }
            title.htmlFor = field.id;
            return field.id;
        }
    }

    var data = {};
    this.createElement = function (parent, data, customid) {
        this.data = data;
        var form = this.data.form ? this.data.form : {};
        var item = this.data.item ? this.data.item : {};
        var sels = this.data.selects ? this.data.selects : {};
        var desc = this.data.descriptor ? this.data.descriptor : {};
        var callbacks = this.data.callbacks ? this.data.callbacks : {};
        var buttons = this.data.buttons ? this.data.buttons : {};
        var other = this.data.other ? this.data.other : {};
        var p = parent;
        var newid = customid ? customid : randomString(5);
        var fieldid = newid + randomString(5);
        //clear elements
        while (p.firstChild) {
            p.removeChild(p.firstChild);
        }
        //styles
        var styleheader = document.createElement('style');
        styleheader.type = 'text/css';
        styleheader.innerHTML = '.FormElementHeader' + newid + ' '
                + (other.FormElementHeader ? other.FormElementHeader : '{border-bottom: dashed 1px gray;}');
        p.appendChild(styleheader);
        var styleline = document.createElement('style');
        styleline.type = 'text/css';
        styleline.innerHTML = '.FormElementLine' + newid + ' '
                + (other.FormElementLine ? other.FormElementLine : '{margin: 5px; display: table; width: 100%; }');
        p.appendChild(styleline);
        var styletitle = document.createElement('style');
        styletitle.type = 'text/css';
        styletitle.innerHTML = '.FormElementTitle' + newid + ' '
                + (other.FormElementTitle ? other.FormElementTitle : '{display: table-cell; padding-left: 5px; width: 29%; vertical-align: top; }');
        p.appendChild(styletitle);
        var stylefield = document.createElement('style');
        stylefield.type = 'text/css';
        stylefield.innerHTML = '.FormElementField' + newid + ' '
                + (other.FormElementField ? other.FormElementField : '{display: table-cell; padding-left: 5px; border: solid 1px gray; border-radius: 3px; width: 90%;}');
        p.appendChild(stylefield);
        var styledelimiter = document.createElement('style');
        styledelimiter.type = 'text/css';
        styledelimiter.innerHTML = '.FormElementDelimiter' + newid + ' '
                + (other.FormElementDelimiter ? other.FormElementDelimiter : '{width: 100%; height: 5px;}');
        p.appendChild(styledelimiter);
        var stylebuttons = document.createElement('style');
        stylebuttons.type = 'text/css';
        stylebuttons.innerHTML = '.FormElementButtons' + newid + ' '
                + (other.FormElementButtons ? other.FormElementButtons : '{margin: 10px;}');
        p.appendChild(stylebuttons);
        //header
        if (other.header) {
            var header = document.createElement('div');
            header.innerHTML = other.header;
            header.addClassName('FormElementHeader' + newid);
            p.appendChild(header);
        }

        //create form form.submit();
        //Object.keys(object).length;
        let c = p;
        if (Object.keys(form).length !== 0) {
            let f = document.createElement('form');
            f.id = p.id + "form";
            f.method = form.method;
            f.action = form.action;
            p.appendChild(f);
            c = f;
        }
        //create and bind fields
        for (var i in item) {
            if (desc.hasOwnProperty(i)) {
                var delimiter = document.createElement('div');
                delimiter.addClassName('FormElementDelimiter' + newid);
                c.appendChild(delimiter);

                var eid = createFormElement(c, item[i], desc[i], sels[i], newid);
                bindDomElemToObjProp($(eid), item, i, callbacks[i]);
                if (!data.controls) {
                    data.controls = {};
                }
                data.controls[i] = eid;
            }
        }
        //create buttons
        var btnsdiv = document.createElement("div");
        btnsdiv.addClassName('FormElementLine' + newid);
        for (var i in buttons) {
            let btnid=fieldid+ randomString(5);
            if (Object.keys(form).length !== 0) {
                let b = document.createElement('button');
                b.innerText = i;
                if (buttons[i] === "submit" || buttons[i] === "reset" || buttons[i] === "button") {
                    b.type = buttons[i];
                } else {
                    b.type = "button";
                    b.observe('click', buttons[i]);
                }
                b.addClassName('FormElementButtons' + newid);
                b.id = "FormElementButton" + btnid;
                b.baseid = newid;
                btnsdiv.appendChild(b);
            } else {
                let a = document.createElement('a');
                let linkText = document.createTextNode(i);
                a.appendChild(linkText);
                a.title = i;
                a.href = "#";
                a.addClassName('FormElementButtons' + newid);
                a.id = "FormElementButton" + btnid;
                a.baseid = newid;
                //a.setStyle({padding: '5px', border: '1px solid gray'});
                if (typeof buttons[i] === "function") {
                    a.observe('click', buttons[i]);
                } else if (typeof buttons[i] === "string") {
                    a.observe('click', eval(buttons[i]));
                }
                btnsdiv.appendChild(a);
            }
        }
        c.appendChild(btnsdiv);
    };

    this.touchRow = function (id, obj, multi = false) {
        var touchedRows;
        if (!obj.parentNode.touchedRows) {
            touchedRows = [];
        } else {
            touchedRows = obj.parentNode.touchedRows;
        }
        var finded = -1;
        touchedRows.forEach(function (item, index, array) {
            if (item.touched === id) {
                finded = index;
            }
        });
        if (finded === -1) {
            if (!multi) {
                touchedRows.forEach(function (item, index, array) {
                    var oldRow = item;
                    oldRow.element.style.backgroundColor = oldRow.background;
                    touchedRows.splice(item, 1);
                });
            }
            var newRow = {
                "background": obj.style.backgroundColor,
                "touched": id,
                "element": obj
            };
            touchedRows.push(newRow);
            obj.style.backgroundColor = 'salmon';
        } else {
            var oldRow = touchedRows[finded];
            oldRow.element.style.backgroundColor = oldRow.background;
            touchedRows.splice(finded, 1);
        }
        obj.parentNode.touchedRows = touchedRows;
    };
}

