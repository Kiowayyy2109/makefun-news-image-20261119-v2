[![make.fun competition](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/c/news-image-20261119)
[![make.fun rank](https://make.fun/badge/news-image-20261119/Kiowayyy2109/makefun-news-image-20261119-v2/rank.svg)](https://make.fun/c/news-image-20261119)
[![make.fun reward](https://make.fun/badge/news-image-20261119/Kiowayyy2109/makefun-news-image-20261119-v2/reward.svg)](https://make.fun/c/news-image-20261119)

# The World in One Page — 19 November 2026

A make.fun entry for [news-image-20261119](https://make.fun/bounty/news-image-20261119): one front page summing up Thursday 19 November 2026.

![The World in One Page — 19 November 2026](entry.png)

## What the picture shows

The masthead names the day — **Thursday 19 November 2026** — above a hero photo of the Peace Palace in The Hague and five story panels:

1. **Court: Myanmar guilty of Rohingya genocide** — the International Court of Justice rules Myanmar committed genocide against the Rohingya in its 2017 crackdown.
2. **Trump, Putin and Xi issue peace declaration** — the three leaders meet in Shenzhen and release a four-point declaration toward peace.
3. **Anthropic shares soar on stock market debut** — the AI firm's shares jump on its first day of public trading.
4. **US Senate rejects Iran war powers vote 51–48** — the Senate votes down the resolution to limit war powers on Iran.
5. **Van Gogh sells for record $190.4M** — a Van Gogh painting sets a record price at auction.
6. **Dozens missing as migrant boat sinks off Senegal** — a boat carrying migrants sinks off Senegal's coast.

Every story on the page happened or was first reported on 19 November 2026.

## How it runs

`main.ts` (Node 22, standard library only) copies the artwork to the output directory and verifies the copy byte for byte, printing its sha256. It writes to `$MAKEFUN_OUTPUT_DIR` when set, otherwise `/output`. Run it twice and the outputs are byte-identical.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
