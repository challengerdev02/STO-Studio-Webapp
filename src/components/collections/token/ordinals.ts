export type Ordinals = {
  "version": "0.1.0",
  "name": "ordinals",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "parameterControl",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeAdmin",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdm",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeParam",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newParam",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setCaller",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "approved",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createInscription",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "coll",
          "type": "string"
        },
        {
          "name": "inscriptionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "setInscription",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "coll",
          "type": "string"
        },
        {
          "name": "inscriptionId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ordinal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "parameterAddr",
            "type": "publicKey"
          },
          {
            "name": "caller",
            "type": "bool"
          },
          {
            "name": "inscription",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "coll",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Double",
      "msg": "Double."
    },
    {
      "code": 6001,
      "name": "InvAdd",
      "msg": "100"
    },
    {
      "code": 6002,
      "name": "OnlyAdminAllowed",
      "msg": "101"
    }
  ]
};

export const IDL: Ordinals = {
  "version": "0.1.0",
  "name": "ordinals",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "parameterControl",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeAdmin",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdm",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeParam",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newParam",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setCaller",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "approved",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createInscription",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "coll",
          "type": "string"
        },
        {
          "name": "inscriptionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "setInscription",
      "accounts": [
        {
          "name": "ordinals",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "coll",
          "type": "string"
        },
        {
          "name": "inscriptionId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ordinal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "parameterAddr",
            "type": "publicKey"
          },
          {
            "name": "caller",
            "type": "bool"
          },
          {
            "name": "inscription",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "coll",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Double",
      "msg": "Double."
    },
    {
      "code": 6001,
      "name": "InvAdd",
      "msg": "100"
    },
    {
      "code": 6002,
      "name": "OnlyAdminAllowed",
      "msg": "101"
    }
  ]
};
