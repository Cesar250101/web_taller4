from odoo import api, SUPERUSER_ID


def post_init_hook(cr, registry):
    env = api.Environment(cr, SUPERUSER_ID, {})
    website = env['website'].search([('name', '=', 'Taller4')], limit=1)
    if website:
        lang_es_cl = env['res.lang'].search([('code', '=', 'es_CL')], limit=1) \
            or env['res.lang'].search([('code', '=', 'es')], limit=1)
        vals = {'homepage_url': '/taller4'}
        if lang_es_cl:
            vals['language_ids'] = [(6, 0, [lang_es_cl.id])]
            vals['default_lang_id'] = lang_es_cl.id
        website.write(vals)

        # Menú "Marcas" colgado del menú principal del sitio Taller4
        Menu = env['website.menu']
        top_menu = website.menu_id
        for label, url, seq in [
            ('Marcas', '/marcas', 20),
            ('Cambios y Devoluciones', '/cambios-y-devoluciones', 80),
            ('Contacto', '/contacto', 90),
        ]:
            if top_menu and not Menu.search([
                ('website_id', '=', website.id),
                ('url', '=', url),
            ], limit=1):
                Menu.create({
                    'name': label,
                    'url': url,
                    'parent_id': top_menu.id,
                    'website_id': website.id,
                    'sequence': seq,
                })
