from odoo import fields, models


class ProductRibbon(models.Model):
    _inherit = 'product.ribbon'

    tipo = fields.Selection(
        selection=[
            ('venta', 'Venta'),
            ('agotado', 'Agotado'),
            ('fuera_stock', 'Fuera de stock'),
            ('nuevo', '¡Nuevo!'),
        ],
        string='Tipo de cinta',
    )
    imagen = fields.Image(
        string='Imagen',
        help='Imagen asociada a la cinta. Usada por ejemplo en la sección "Nueva colección" del sitio Taller4.',
    )
