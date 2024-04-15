import logging

from pythonjsonlogger import jsonlogger
# from starlette_context import context

# from .constants import KnownHeaders

EXTRA_DATA_KEY = 'extra'
BUILD_NUMBER_KEY = 'build_number'

handler = logging.StreamHandler()
format_str = '%(message)%(levelname)%(name)%(asctime)%(msecs)dZ%(levelno)s'
formatter = jsonlogger.JsonFormatter(format_str)
handler.setFormatter(formatter)

default_logger = logging.getLogger('default')
default_logger.addHandler(handler)
default_logger.setLevel(logging.INFO)

class AppLogger(logging.LoggerAdapter):
  def __init__(self):
    super().__init__(default_logger, {})
