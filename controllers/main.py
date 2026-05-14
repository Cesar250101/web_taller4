from odoo import http
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale


class Taller4Marcas(http.Controller):

    @http.route(['/marcas'], type='http', auth='public', website=True, sitemap=True)
    def marcas(self, **kw):
        marcas = request.env['method_minori.marcas'].sudo().search(
            [('active', '=', True), ('marca_imagen', '!=', False)],
            order='name asc',
        )
        return request.render('web_taller4.t4_marcas_page', {'marcas': marcas})

    @http.route(['/coleccion/nuevo'], type='http', auth='public', website=True, sitemap=True)
    def coleccion_nuevo(self, **kw):
        ribbons = request.env['product.ribbon'].sudo().search([('tipo', '=', 'nuevo')])
        productos = request.env['product.template'].sudo().search([
            ('website_ribbon_id', 'in', ribbons.ids),
            ('website_published', '=', True),
        ], order='create_date desc')
        return request.render('web_taller4.t4_coleccion_nuevo_page', {
            'productos': productos,
            'ribbon': ribbons[:1],
        })


class WebsiteSaleMarca(WebsiteSale):

    def _get_marca_id(self):
        marca_id = request.params.get('marca_id') or request.httprequest.args.get('marca_id')
        try:
            return int(marca_id) if marca_id else False
        except (TypeError, ValueError):
            return False

    def _get_search_domain(self, search, category, attrib_values, search_in_description=True):
        domain = super()._get_search_domain(search, category, attrib_values, search_in_description)
        marca_id = self._get_marca_id()
        if marca_id:
            domain += [('marca_id', '=', marca_id)]
        return domain

    def _shop_lookup_products(self, attrib_set, options, post, search, website):
        fuzzy_search_term, product_count, search_result = super()._shop_lookup_products(
            attrib_set, options, post, search, website)
        marca_id = self._get_marca_id()
        if marca_id:
            search_result = search_result.filtered(lambda p: p.marca_id.id == marca_id)
            product_count = len(search_result)
        return fuzzy_search_term, product_count, search_result

    def _shop_get_query_url_kwargs(self, category, search, min_price, max_price, attrib=None, order=None, **post):
        kwargs = super()._shop_get_query_url_kwargs(category, search, min_price, max_price,
                                                    attrib=attrib, order=order, **post)
        marca_id = self._get_marca_id()
        if marca_id:
            kwargs['marca_id'] = marca_id
        return kwargs

    @http.route()
    def shop(self, page=0, category=None, search='', min_price=0.0, max_price=0.0, ppg=False, **post):
        response = super().shop(page=page, category=category, search=search,
                                min_price=min_price, max_price=max_price, ppg=ppg, **post)
        marca_id = self._get_marca_id()
        if marca_id and hasattr(response, 'qcontext'):
            marca = request.env['method_minori.marcas'].sudo().browse(marca_id).exists()
            if marca:
                response.qcontext['t4_marca'] = marca
        return response
