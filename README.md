# Configuration generator for daily rewards

> [This app](https://logicworlds.github.io/RewardsConfiguration) makes configs with random awards for our Minecraft servers. We use [Oxygen-Daily-Rewards](https://github.com/AustereTony-MCMods/Oxygen-Daily-Rewards/) system. Rewards are configured for each month and for every day through JSON configs.

[![license](https://img.shields.io/github/license/LogicWorlds/RewardsConfiguration?color=0277bd&style=flat-square)](https://github.com/LogicWorlds/RewardsConfiguration/blob/master/LICENSE)

## Usage

1. Choose month (next month is set by default)
2. Insert a JSON with awards list.  You can choose an existing template and edit
   it as you want.
3. Press "Make" button. The resulting JSON should appear below the button.
4. You can copy the resulting JSON with the "Copy" button and paste it to the
   mod's config directory.

## Input JSON

The input JSON must be an array with three objects, each containing this three
properties:

* *type*: *COMMAND*, *CURRENCY*, and *ITEM*
* *description* (optional)
* *rewards*: an array of possible rewards

All rewards of the same type must have the same structure:

**COMMAND**

```json
{
  "description": "300 Claim blocks",
  "special": true,
  "tooltip": "Count of claim blocks: 300",
  "icon": "claimblocks.png",
  "commands": "/acb @p 300",
  "weight": "l"
}
```

**CURRENCY**

```json
{
  "amount": 12,
  "special": false,
  "currency_index": 0,
  "weight": "l"
}
```

**ITEM**

```json
{
  "amount": 64,
  "special": false,
  "itemstack": {
    "registry_name": "ic2:itemscrapbox",
    "damage": 0,
    "itemstack_nbt": "",
    "capabilities_nbt": ""
  },
  "weight": "h"
}
```

See the
[patterns](https://github.com/LogicWorlds/RewardsConfiguration/tree/master/patterns)
directory for more examples.

## Resulting JSON

The resulting JSON will contain a random list of rewards chosen from the input
JSON for the whole month.

Example:

```json
[
  {
    "day": 1,
    "type": "COMMAND",
    "description": "150 Claim blocks",
    "special": true,
    "tooltip": "Count of claim blocks: 150",
    "icon": "claimblocks.png",
    "commands": "/acb @p 150"
  },
  {
    "day": 2,
    "type": "ITEM",
    "description": "oxygen_dailyrewards.description.item",
    "amount": 16,
    "special": false,
    "itemstack": {
      "registry_name": "ic2:itemscrapbox",
      "damage": 0,
      "itemstack_nbt": "",
      "capabilities_nbt": ""
    }
  },

```
...and so on for each day of month.

## License

[GNU General Public License v3.0](https://github.com/LogicWorlds/RewardsConfiguration/blob/master/LICENSE)
