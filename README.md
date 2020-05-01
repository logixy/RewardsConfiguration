# RewardsConfiguration
Генератор конфигурации для
[Oxygen-Daily-Rewards](https://github.com/AustereTony-MCMods/Oxygen-Daily-Rewards)


## Генерация конфигурации

1. Выбрать месяц (по умолчанию - следующий)
2. Вставить JSON со списком наград (пример см. ниже)
3. Нажать "Сделать JSON"
4. Нажать "Копировать", чтобы поместить сгенерированную конфигурацию в буфер обмена


## Пример входного JSON

```json
[
  {
    "type": "COMMAND",
    "rewards": [
      {
        "description": "100 Logics",
        "special": true,
        "tooltip": "Money: 100 Logics",
        "icon": "money.png",
        "commands": "/adminpay @p 100",
        "weight": 0.7
      },
      {
        "description": "150 Logics",
        "special": true,
        "tooltip": "Money: 150 Logics",
        "icon": "money.png",
        "commands": "/adminpay @p 150",
        "weight": 0.3
      }
    ]
  },
  {
    "type": "CURRENCY",
    "rewards": [
      {
        "description": "oxygen_dailyrewards.description.currency",
        "amount": 30,
        "special": false,
        "currency_index": 0,
        "weight": 0.5
      },
      {
        "description": "oxygen_dailyrewards.description.currency",
        "amount": 10,
        "special": false,
        "currency_index": 0,
        "weight": 0.7
      }
    ]
  },
  {
    "type": "ITEM",
    "rewards": [
      {
        "description": "oxygen_dailyrewards.description.item",
        "amount": 5,
        "special": false,
        "itemstack": {
          "registry_name": "ic2:te",
          "damage": 8,
          "itemstack_nbt": "",
          "capabilities_nbt": ""
        },
        "weight": 0.99
      },
      {
        "description": "oxygen_dailyrewards.description.item",
        "amount": 15,
        "special": true,
        "itemstack": {
          "registry_name": "ic2:te",
          "damage": 8,
          "itemstack_nbt": "",
          "capabilities_nbt": ""
        },
        "weight": 1
      }
    ]
  }
]
```
