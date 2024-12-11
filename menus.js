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

function Menus() {
    var preffix = "floatmenu";
    this.setMenuIdPreffix = function (idmenu) {
        preffix = idmenu;
    };

    this.showMenu = function (idmenu) {
        var arrmenus = $$('div[id^="' + preffix + '"]');
        arrmenus.forEach(function (element, index, array) {
            element.hide();
        });
        if (idmenu) {
            $(idmenu).show();
        }
    };
    this.showTab = function (idtab, tabpreffix) {
        var arrmenus = $$('div[id^="' + tabpreffix + '"]');
        arrmenus.forEach(function (element, index, array) {
            element.hide();
        });
        if (idtab) {
            $(idtab).show();
        }
    };
}
