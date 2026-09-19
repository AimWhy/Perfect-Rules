function main(config) {

  // ================================================================
  // Clash Mi / Mihomo Perfect-Rules v1.4
  //
  // v1.4 changes:
  //   - Keep all tested v1.3 configuration and proxy-group logic
  //   - Move business rules to GitHub Rule Providers
  //   - AI / Google / YouTube / GitHub / Network Test
  //
  // Rule source:
  //   https://github.com/n0de-sudo/Perfect-Rules
  //
  // ================================================================


  // ================================================================
  // 1. Basic configuration
  // ================================================================

  config["mixed-port"] = 7890;

  config["mode"] = "rule";

  config["unified-delay"] = true;

  config["tcp-concurrent"] = true;

  config["log-level"] = "error";

  config["ipv6"] = false;

  config["allow-lan"] = false;

  config["find-process-mode"] = "always";

  config["keep-alive-interval"] = 30;

  config["keep-alive-idle"] = 30;

  config["disable-keep-alive"] = false;


  // ================================================================
  // 2. Profile
  // ================================================================

  config["profile"] = {

    "store-selected": true,

    "store-fake-ip": true

  };


  // ================================================================
  // 3. DNS
  // ================================================================

  config["dns"] = {

    "enable": true,

    "listen": "0.0.0.0:53",

    "prefer-h3": false,

    "ipv6": false,

    "enhanced-mode": "fake-ip",

    "fake-ip-range": "172.19.0.1/16",

    "fake-ip-filter": [

      "+.lan",
      "+.local",
      "+.localhost",
      "+.home.arpa",

      "time.*.com",
      "time.*.gov",
      "pool.ntp.org",

      "+.push.apple.com",

      "mesu.apple.com",
      "swscan.apple.com",

      "captive.apple.com",

      "connectivitycheck.gstatic.com",

      "connectivitycheck.android.com",

      "www.msftconnecttest.com",

      "www.msftncsi.com"

    ],

    "default-nameserver": [

      "223.5.5.5",
      "119.29.29.29"

    ],

    "nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "nameserver-policy": {

      "geosite:cn": [

        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"

      ],

      "geosite:private": [

        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"

      ],

      "geolocation-!cn": [

        "https://cloudflare-dns.com/dns-query",
        "https://dns.google/dns-query"

      ]

    },

    "proxy-server-nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "direct-nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "fallback": [

      "https://cloudflare-dns.com/dns-query",
      "https://dns.google/dns-query"

    ],

    "fallback-filter": {

      "geoip": true,

      "geoip-code": "CN",

      "geosite": [

        "gfw"

      ],

      "domain": [

        "+.google.com",
        "+.googleapis.com",
        "+.googlevideo.com",
        "+.youtube.com",
        "+.github.com",
        "+.openai.com",
        "+.chatgpt.com",
        "+.anthropic.com",
        "+.claude.ai"

      ]

    }

  };


  // ================================================================
  // 4. TUN
  // ================================================================

  config["tun"] = {

    "enable": true,

    "device": "Clash Mi",

    "stack": "gvisor",

    "dns-hijack": [

      "0.0.0.0:53"

    ],

    "auto-route": true,

    "auto-detect-interface": false,

    "strict-route": true,

    "mtu": 1280,

    "inet4-address": [

      "172.19.0.1/30"

    ],

    "auto-redirect": false,

    "disable-icmp-forwarding": true

  };


  // ================================================================
  // 5. Sniffer
  // ================================================================

  config["sniffer"] = {

    "enable": true,

    "parse-pure-ip": true,

    "force-dns-mapping": true,

    "override-destination": true,

    "sniff": {

      "HTTP": {

        "ports": [

          80,
          "8080-8880"

        ]

      },

      "TLS": {

        "ports": [

          443,
          8443

        ]

      },

      "QUIC": {

        "ports": [

          443,
          8443

        ]

      }

    },

    "skip-domain": [

      "+.push.apple.com",
      "+.mijia.cloud"

    ]

  };


  // ================================================================
  // 6. NTP
  // ================================================================

  config["ntp"] = {

    "enable": true,

    "write-to-system": false,

    "server": "time.apple.com",

    "port": 123,

    "interval": 30

  };


  // ================================================================
  // 7. GitHub Rule Providers
  // ================================================================
  //
  // These rules are shared with the Perfect-Rules repository.
  //
  // IMPORTANT:
  // Do not put business rules directly inside this JS.
  // Update the YAML files in GitHub instead.
  //
  // ================================================================

  var ruleBaseURL =
    "https://cdn.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/";

  config["rule-providers"] = {

    "AI": {

      "type": "http",

      "behavior": "classical",

      "format": "yaml",

      "url": ruleBaseURL + "ai.yaml",

      "interval": 86400

    },

    "Google": {

      "type": "http",

      "behavior": "classical",

      "format": "yaml",

      "url": ruleBaseURL + "google.yaml",

      "interval": 86400

    },

    "YouTube": {

      "type": "http",

      "behavior": "classical",

      "format": "yaml",

      "url": ruleBaseURL + "youtube.yaml",

      "interval": 86400

    },

    "GitHub": {

      "type": "http",

      "behavior": "classical",

      "format": "yaml",

      "url": ruleBaseURL + "github.yaml",

      "interval": 86400

    },

    "NetworkTest": {

      "type": "http",

      "behavior": "classical",

      "format": "yaml",

      "url": ruleBaseURL + "network-test.yaml",

      "interval": 86400

    }

  };


  // ================================================================
  // 8. Original proxies
  // ================================================================

  var originalProxies = Array.isArray(config["proxies"])
    ? config["proxies"]
    : [];


  var proxyNames = [];

  originalProxies.forEach(function(proxy) {

    if (proxy && proxy.name) {

      proxyNames.push(proxy.name);

    }

  });


  // ================================================================
  // 9. Original proxy groups
  // ================================================================

  var originalGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"]
    : [];


  // ================================================================
  // 10. Perfect-Rules managed groups
  // ================================================================

  var managedGroups = {

    "🌐 JS手动选择": true,

    "🤖 AI": true,

    "▶️ YouTube": true,

    "🔎 Google": true,

    "🐙 GitHub": true,

    "🧪 网络检测": true,

    "🎬 Netflix": true,

    "🎵 Spotify": true,

    "🎮 Steam": true,

    "🇭🇰 香港": true,

    "🇹🇼 台湾": true,

    "🇯🇵 日本": true,

    "🇸🇬 新加坡": true,

    "🇺🇸 美国": true,

    "🇨🇦 加拿大": true,

    "🇬🇧 英国": true,

    "🌍 其他地区": true

  };


  // ================================================================
  // 11. Built-in proxy targets
  // ================================================================

  var builtinTargets = {

    "DIRECT": true,

    "REJECT": true,

    "REJECT-DROP": true,

    "PASS": true,

    "COMPATIBLE": true,

    "GLOBAL": true

  };


  // ================================================================
  // 12. Business group name detection
  // ================================================================

  function isBusinessGroupName(name) {

    if (!name) {

      return false;

    }

    var text = String(name).toLowerCase();

    var patterns = [

      /ai/i,

      /openai/i,

      /chatgpt/i,

      /claude/i,

      /gemini/i,

      /netflix/i,

      /disney/i,

      /disney\+/i,

      /youtube/i,

      /google/i,

      /github/i,

      /spotify/i,

      /steam/i,

      /tiktok/i,

      /telegram/i,

      /twitter/i,

      /x\.com/i,

      /facebook/i,

      /instagram/i,

      /流媒体/i,

      /媒体/i,

      /影音/i,

      /视频/i,

      /游戏/i,

      /游戏专用/i,

      /机场专用/i,

      /节点分流/i

    ];


    for (var i = 0; i < patterns.length; i++) {

      if (patterns[i].test(text)) {

        return true;

      }

    }


    return false;

  }


  // ================================================================
  // 13. Group type helpers
  // ================================================================

  function isAutoSelectGroup(name) {

    if (!name) {

      return false;

    }

    return (

      /自动选择/i.test(name) ||

      /auto[\s_-]*select/i.test(name) ||

      /auto[\s_-]*test/i.test(name) ||

      /测速/i.test(name)

    );

  }


  function isFailoverGroup(name) {

    if (!name) {

      return false;

    }

    return (

      /故障转移/i.test(name) ||

      /failover/i.test(name) ||

      /fallback/i.test(name)

    );

  }


  function isAllNodeName(name) {

    if (!name) {

      return false;

    }

    return (

      /全部节点/i.test(name) ||

      /所有节点/i.test(name) ||

      /全部/i.test(name) ||

      /all[\s_-]*nodes?/i.test(name) ||

      /all[\s_-]*proxies?/i.test(name)

    );

  }


  // ================================================================
  // 14. Calculate group composition
  // ================================================================

  function getProxyComposition(group) {

    var result = {

      total: 0,

      actualNodes: 0,

      groups: 0,

      builtin: 0,

      unknown: 0

    };


    if (
      !group ||
      !Array.isArray(group.proxies)
    ) {

      return result;

    }


    result.total = group.proxies.length;


    group.proxies.forEach(function(item) {

      if (!item) {

        return;

      }


      // Actual proxy node

      if (proxyNames.indexOf(item) !== -1) {

        result.actualNodes++;

        return;

      }


      // Built-in target

      if (builtinTargets[item]) {

        result.builtin++;

        return;

      }


      // Another proxy group

      var referencedGroup = originalGroups.some(
        function(g) {

          return (
            g &&
            g.name === item
          );

        }
      );


      if (referencedGroup) {

        result.groups++;

        return;

      }


      result.unknown++;

    });


    return result;

  }


  // ================================================================
  // 15. Detect All-Nodes group
  // ================================================================

  function isAllNodesGroup(group) {

    if (!group || !group.name) {

      return false;

    }


    var name = String(group.name);


    // ------------------------------------------------
    // 1. Explicit All-Nodes names
    // ------------------------------------------------

    if (isAllNodeName(name)) {

      return true;

    }


    // ------------------------------------------------
    // 2. Obvious business groups are never treated
    //    as All-Nodes groups.
    // ------------------------------------------------

    if (isBusinessGroupName(name)) {

      return false;

    }


    // ------------------------------------------------
    // 3. Analyze the group composition.
    // ------------------------------------------------

    var composition =
      getProxyComposition(group);


    if (composition.total === 0) {

      return false;

    }


    // ------------------------------------------------
    // 4. At least two actual proxy nodes.
    // ------------------------------------------------

    if (composition.actualNodes < 2) {

      return false;

    }


    // ------------------------------------------------
    // 5. Actual nodes must represent a meaningful
    //    portion of the group.
    // ------------------------------------------------

    var ratio =
      composition.actualNodes /
      composition.total;


    if (ratio < 0.3) {

      return false;

    }


    // ------------------------------------------------
    // 6. The group may contain other proxy groups.
    // ------------------------------------------------

    if (composition.groups > 0) {

      if (composition.actualNodes >= 5) {

        return true;

      }

      return false;

    }


    // ------------------------------------------------
    // 7. Normal node collection group.
    // ------------------------------------------------

    return true;

  }


  // ================================================================
  // 16. Detect basic airport groups
  // ================================================================

  function isBasicGroup(group) {

    if (!group || !group.name) {

      return false;

    }


    var name = String(group.name);


    // Auto Select

    if (isAutoSelectGroup(name)) {

      return true;

    }


    // Failover

    if (isFailoverGroup(name)) {

      return true;

    }


    // All Nodes

    if (isAllNodesGroup(group)) {

      return true;

    }


    return false;

  }


  // ================================================================
  // 17. Preserve basic airport groups
  // ================================================================

  var preservedGroups = [];


  originalGroups.forEach(function(group) {

    if (!group || !group.name) {

      return;

    }


    if (managedGroups[group.name]) {

      return;

    }


    if (!isBasicGroup(group)) {

      return;

    }


    var copied = JSON.parse(
      JSON.stringify(group)
    );


    preservedGroups.push(copied);

  });


  // ================================================================
  // 18. Convert Auto Select groups to URL-Test
  // ================================================================

  preservedGroups.forEach(function(group) {

    if (!group || !group.name) {

      return;

    }


    if (!isAutoSelectGroup(group.name)) {

      return;

    }


    group.type = "url-test";


    group.proxies = proxyNames.slice();


    group.url =
      "https://www.gstatic.com/generate_204";


    group.interval = 300;

    group.timeout = 5000;

    group.tolerance = 50;

    group.lazy = true;

    group["max-failed-times"] = 3;

    group["expected-status"] = 204;

    delete group["disable-udp"];

    delete group["strategy"];

  });


  // ================================================================
  // 19. Remove managed groups from preserved groups
  // ================================================================

  var finalPreservedGroups = [];


  preservedGroups.forEach(function(group) {

    if (

      group &&

      group.name &&

      !managedGroups[group.name]

    ) {

      finalPreservedGroups.push(group);

    }

  });


  // ================================================================
  // 20. Region detection
  // ================================================================

  var regionPatterns = {

    "🇭🇰 香港": [

      /香港/i,

      /\bHK\b/i,

      /Hong\s*Kong/i,

      /HongKong/i

    ],

    "🇹🇼 台湾": [

      /台湾/i,

      /台灣/i,

      /\bTW\b/i,

      /Taiwan/i

    ],

    "🇯🇵 日本": [

      /日本/i,

      /\bJP\b/i,

      /Japan/i,

      /Tokyo/i,

      /Osaka/i

    ],

    "🇸🇬 新加坡": [

      /新加坡/i,

      /\bSG\b/i,

      /Singapore/i

    ],

    "🇺🇸 美国": [

      /美国/i,

      /\bUS\b/i,

      /\bUSA\b/i,

      /United\s*States/i,

      /America/i,

      /Los\s*Angeles/i,

      /San\s*Jose/i,

      /New\s*York/i

    ],

    "🇨🇦 加拿大": [

      /加拿大/i,

      /\bCA\b/i,

      /Canada/i,

      /Toronto/i,

      /Vancouver/i

    ],

    "🇬🇧 英国": [

      /英国/i,

      /\bUK\b/i,

      /United\s*Kingdom/i,

      /England/i,

      /London/i

    ]

  };


  function detectRegion(proxyName) {

    for (var region in regionPatterns) {

      if (!regionPatterns.hasOwnProperty(region)) {

        continue;

      }


      var patterns = regionPatterns[region];


      for (var i = 0; i < patterns.length; i++) {

        if (patterns[i].test(proxyName)) {

          return region;

        }

      }

    }


    return "🌍 其他地区";

  }


  // ================================================================
  // 21. Build region node lists
  // ================================================================

  var regionNodes = {

    "🇭🇰 香港": [],

    "🇹🇼 台湾": [],

    "🇯🇵 日本": [],

    "🇸🇬 新加坡": [],

    "🇺🇸 美国": [],

    "🇨🇦 加拿大": [],

    "🇬🇧 英国": [],

    "🌍 其他地区": []

  };


  originalProxies.forEach(function(proxy) {

    if (!proxy || !proxy.name) {

      return;

    }


    var region =
      detectRegion(String(proxy.name));


    regionNodes[region].push(
      proxy.name
    );

  });


  // ================================================================
  // 22. Region order
  // ================================================================

  var regionOrder = [

    "🇭🇰 香港",

    "🇹🇼 台湾",

    "🇯🇵 日本",

    "🇸🇬 新加坡",

    "🇺🇸 美国",

    "🇨🇦 加拿大",

    "🇬🇧 英国",

    "🌍 其他地区"

  ];


  // ================================================================
  // 23. Create region groups
  // ================================================================

  var regionGroups = [];


  regionOrder.forEach(function(region) {

    var nodes =
      regionNodes[region];


    if (
      !nodes ||
      nodes.length === 0
    ) {

      return;

    }


    regionGroups.push({

      "name": region,

      "type": "url-test",

      "proxies": nodes,

      "url":
        "https://www.gstatic.com/generate_204",

      "interval": 300,

      "timeout": 5000,

      "tolerance": 50,

      "lazy": true,

      "max-failed-times": 3,

      "expected-status": 204

    });

  });


  var availableRegions =
    regionGroups.map(function(group) {

      return group.name;

    });


  // ================================================================
  // 24. Main selector
  // ================================================================

  var mainSelector = {

    "name": "🌐 JS手动选择",

    "type": "select",

    "proxies": availableRegions.concat([

      "DIRECT"

    ])

  };


  // ================================================================
  // 25. Business groups
  // ================================================================

  function createBusinessGroup(name) {

    return {

      "name": name,

      "type": "select",

      "proxies": availableRegions.concat([

        "DIRECT"

      ])

    };

  }


  var businessGroups = [

    createBusinessGroup("🤖 AI"),

    createBusinessGroup("▶️ YouTube"),

    createBusinessGroup("🔎 Google"),

    createBusinessGroup("🐙 GitHub"),

    createBusinessGroup("🧪 网络检测")

  ];


  // ================================================================
  // 26. Final proxy-group architecture
  //
  //   Airport basic groups
  //          ↓
  //   Perfect-Rules business groups
  //          ↓
  //   Perfect-Rules region groups
  //          ↓
  //   Perfect-Rules manual selector
  //
  // ================================================================

  config["proxy-groups"] =

    finalPreservedGroups

      .concat(businessGroups)

      .concat(regionGroups)

      .concat([mainSelector]);


  // ================================================================
  // 27. Perfect-Rules rules
  //
  // Rules are now loaded from GitHub Rule Providers.
  //
  // IMPORTANT:
  // Private / LAN rules remain local because there is currently
  // no private.yaml in the repository.
  //
  // ================================================================

  config["rules"] = [

    // --------------------------------------------------------------
    // Private / LAN
    // --------------------------------------------------------------

    "DOMAIN-SUFFIX,lan,DIRECT",

    "DOMAIN-SUFFIX,local,DIRECT",

    "DOMAIN-SUFFIX,localhost,DIRECT",

    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",

    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",

    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",

    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",


    // --------------------------------------------------------------
    // Network Test
    // --------------------------------------------------------------

    "RULE-SET,NetworkTest,🧪 网络检测",


    // --------------------------------------------------------------
    // AI
    // --------------------------------------------------------------

    "RULE-SET,AI,🤖 AI",


    // --------------------------------------------------------------
    // Google
    // --------------------------------------------------------------

    "RULE-SET,Google,🔎 Google",


    // --------------------------------------------------------------
    // YouTube
    // --------------------------------------------------------------

    "RULE-SET,YouTube,▶️ YouTube",


    // --------------------------------------------------------------
    // GitHub
    // --------------------------------------------------------------

    "RULE-SET,GitHub,🐙 GitHub",


    // --------------------------------------------------------------
    // Final
    // --------------------------------------------------------------

    "MATCH,🌐 JS手动选择"

  ];


  // ================================================================
  // 28. Return
  // ================================================================

  return config;

}
