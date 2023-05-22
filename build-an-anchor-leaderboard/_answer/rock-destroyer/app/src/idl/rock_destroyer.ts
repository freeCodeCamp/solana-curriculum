export type RockDestroyer = {
  "version": "0.1.0",
  "name": "rock_destroyer",
  "instructions": [
    {
      "name": "initialiseLeaderboard",
      "docs": [
        "Initialises the leaderboard with 5 empty slots"
      ],
      "accounts": [
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newGame",
      "docs": [
        "Starts a new game:",
        "- Creates a new player account",
        "- Pays the game owner 0.5 SOL",
        "- Initialises the player account"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameOwner",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "A constraint is used to ensure that the game owner is the same as the one specified in the program"
          ]
        },
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "addPlayerToLeaderboard",
      "docs": [
        "Adds player to leaderboard",
        "NOTE: username can appear multiple times in the leaderboard"
      ],
      "accounts": [
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "score",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "leaderboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "players",
            "docs": [
              "A list of the top 100 player pubkeys",
              "Includes 101 players to allow for the case where a player has payed but has not yet been added to the leaderboard"
            ],
            "type": {
              "vec": {
                "defined": "Player"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "docs": [
              "The username of the player (max 24 bytes)"
            ],
            "type": "string"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "hasPayed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PlayerNotFound",
      "msg": "Player not found"
    }
  ]
};

export const IDL: RockDestroyer = {
  "version": "0.1.0",
  "name": "rock_destroyer",
  "instructions": [
    {
      "name": "initialiseLeaderboard",
      "docs": [
        "Initialises the leaderboard with 5 empty slots"
      ],
      "accounts": [
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newGame",
      "docs": [
        "Starts a new game:",
        "- Creates a new player account",
        "- Pays the game owner 0.5 SOL",
        "- Initialises the player account"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameOwner",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "A constraint is used to ensure that the game owner is the same as the one specified in the program"
          ]
        },
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "addPlayerToLeaderboard",
      "docs": [
        "Adds player to leaderboard",
        "NOTE: username can appear multiple times in the leaderboard"
      ],
      "accounts": [
        {
          "name": "leaderboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "score",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "leaderboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "players",
            "docs": [
              "A list of the top 100 player pubkeys",
              "Includes 101 players to allow for the case where a player has payed but has not yet been added to the leaderboard"
            ],
            "type": {
              "vec": {
                "defined": "Player"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "docs": [
              "The username of the player (max 24 bytes)"
            ],
            "type": "string"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "hasPayed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PlayerNotFound",
      "msg": "Player not found"
    }
  ]
};
