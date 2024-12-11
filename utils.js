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

function Utils() {

    this.stringToBoolean = function (str) {
        switch (str.toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(str);
        }
    };

    this.randomString = function () {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };

    this.dateToYMD = function (date)
    {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };

    getRequests = function (uri) {
        var _get = {};
        var re = /[?&]([^=&]+)(=?)([^&]*)/g;
        while (m = re.exec(uri))
            _get[decodeURIComponent(m[1])] = (m[2] == '=' ? decodeURIComponent(m[3]) : true);
        return _get;
    };

    this.gotoIndex = function () {
        var href = "index.jsp";
        var pars = getRequests(location.search);
        var spars = "";
        for (var i in pars) {
            if (pars.hasOwnProperty(i)) {
                spars += ((spars.length > 0) ? "&" : "?");
                spars += i + "=" + pars[i];
            }
        }
        //document.location.href = "<%=uri%>/" + href + spars;
        document.location.href = "/" + href;// + spars;
    };

    this.gotoTo = function (href, params, isblank) {
        var pars = getRequests(location.search);
        var npars = getRequests(params);
        var allpars = Object.assign({}, pars, npars);
        var spars = "";
        for (var i in allpars) {
            if (allpars.hasOwnProperty(i)) {
                spars += ((spars.length > 0) ? "&" : "?");
                spars += i + "=" + allpars[i];
            }
        }
        if (isblank) {
            var win = window.open("<%=uri%>/" + href + spars, '_blank');
            win.focus();
        } else {
            document.location.href = "<%=uri%>/" + href + spars;
        }
    };

    this.getGoto = function (href, params) {
        var pars = getRequests(location.search);
        var npars = getRequests(params);
        //Silently don't work in IE. use prototype
        //var allpars = Object.assign({}, pars, npars);
        var allpars = Object.extend(pars, npars);
        var spars = "";
        for (var i in allpars) {
            if (allpars.hasOwnProperty(i)) {
                spars += ((spars.length > 0) ? "&" : "?");
                spars += i + "=" + allpars[i];
            }
        }
        return "<%=uri%>/" + href + spars;
    };

    this.posMeCenter = function (element) {
        var h = window.height;
        var w = window.width;
        element.style.width = (innerWidth - 40) + 'px';
        element.style.height = (innerHeight - 40) + 'px';
        element.style.marginTop = "-" + (innerHeight / 2 - 20) + 'px';
        element.style.marginLeft = "-" + (innerWidth / 2 - 20) + 'px';
    };

    this.noOp = function (text) {
        if (text) {
            console.log(text);
        }
    };

    this.setImage = function (id, newimage) {
        $(id).src = "./images/" + newimage + ".png";
    };

    this.setTextColor = function (id, newcolor) {
        $(id).style.color = newcolor;
        //$(id).style.textShadow = "0 0 1px " + newcolor;
    };

    this.newCaptcha = function (obj) {
        //obj.src = './Captcha/'+Math.random();
        obj.src = './Captcha/captcha.png?rand=' + Math.random();
    };

    this.getFromArrayById = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
        return {};
    };

    this.dateAddDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
}

function FileSlicer(file) {
    this.sliceSize = 1024 * 10;
    this.slices = Math.ceil(file.size / this.sliceSize);
    this.currentSlice = 0;
    this.getNextSlice = function () {
        var start = this.currentSlice * this.sliceSize;
        var end = Math.min((this.currentSlice + 1) * this.sliceSize, file.size);
        ++this.currentSlice;
        return file.slice(start, end);
    };
}
