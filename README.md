# Генератор конфигурации для ежедневных наград

> [Программа](https://logicworlds.github.io/RewardsConfiguration) генерирует JSON со случайным списком наград для игровых серверов. На серверах используется система [Oxygen-Daily-Rewards](https://github.com/AustereTony-MCMods/Oxygen-Daily-Rewards/).

![https://github.com/LogicWorlds/RewardsConfiguration/blob/master/LICENSE](https://img.shields.io/github/license/LogicWorlds/RewardsConfiguration?color=0277bd&style=flat-square)
![https://github.com/LogicWorlds/RewardsConfiguration/issues](https://img.shields.io/github/issues/LogicWorlds/RewardsConfiguration?color=0277bd&style=flat-square)

## Как использовать

1. Выбрать месяц (по умолчанию - следующий)
2. Вставить JSON со списками наград или выбрать шаблон из списка
3. Нажать "Сделать JSON"
4. Нажать "Копировать", чтобы поместить сгенерированную конфигурацию в буфер обмена

Если пишет "Не могу", скорее всего, входной JSON содержит ошибку (см. лог браузера).

## Пример входного JSON

```json
[
  {
    "type": "COMMAND",
    "description": "150 Logics",
    "rewards": [
      {
        "special": true,
        "tooltip": "Money: 100 Logics",
        "icon": "money.png",
        "commands": "/adminpay @p 100",
        "weight": "l"
      },
      {
        "special": true,
        "tooltip": "Money: 150 Logics",
        "icon": "money.png",
        "commands": "/adminpay @p 150",
        "weight": "m"
      }
    ]
  },
  {
    "type": "CURRENCY",
    "description": "oxygen_dailyrewards.description.currency",
    "rewards": [
      {
        "amount": 30,
        "special": false,
        "currency_index": 0,
        "weight": "h"
      },
      {
        "amount": 10,
        "special": false,
        "currency_index": 0,
        "weight": "m"
      }
    ]
  },
  {
    "type": "ITEM",
    "description": "oxygen_dailyrewards.description.item",
    "rewards": [
      {
        "amount": 5,
        "special": false,
        "itemstack": {
          "registry_name": "ic2:te",
          "damage": 8,
          "itemstack_nbt": "",
          "capabilities_nbt": ""
        },
        "weight": "m"
      },
      {
        "amount": 15,
        "special": true,
        "itemstack": {
          "registry_name": "ic2:te",
          "damage": 8,
          "itemstack_nbt": "",
          "capabilities_nbt": ""
        },
        "weight": "l"
      }
    ]
  }
]
```

## Лицензия

[GNU General Public License v3.0](https://github.com/LogicWorlds/RewardsConfiguration/blob/master/LICENSE)
