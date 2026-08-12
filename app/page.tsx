"use client";

import { useMemo, useState } from "react";

const APK_URL =
  "https://expo.dev/artifacts/eas/E6t4NT3FSbz_xAdYmSrrFiEFvEufNOE8heQkb71CvYM.apk";

const starterOptions = ["火锅", "烧烤", "日料", "家常菜"];
const colors = ["#f7b7c7", "#ffdba8", "#b9eadc", "#bdd9ff", "#d9c7ff", "#ffc9ad", "#bdeef0", "#efd0f3"];

export default function Home() {
  const [options, setOptions] = useState(starterOptions);
  const [draft, setDraft] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const wheelBackground = useMemo(() => {
    const slice = 360 / Math.max(options.length, 1);
    const stops = options.flatMap((_, index) => [
      `${colors[index % colors.length]} ${index * slice}deg`,
      `${colors[index % colors.length]} ${(index + 1) * slice}deg`,
    ]);
    return `conic-gradient(from -${slice / 2}deg, ${stops.join(", ")})`;
  }, [options]);

  function addOption() {
    const value = draft.trim();
    if (!value || options.includes(value) || options.length >= 8) return;
    setOptions((current) => [...current, value]);
    setDraft("");
    setResult("");
    setSelectedIndex(null);
  }

  function removeOption(index: number) {
    if (options.length <= 2) return;
    setOptions((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setResult("");
    setSelectedIndex(null);
  }

  function spin() {
    if (spinning || options.length < 2) return;
    const index = Math.floor(Math.random() * options.length);
    setSpinning(true);
    setResult("");
    setSelectedIndex(null);
    setRotation((current) => current + 1440 + Math.floor(Math.random() * 280));
    window.setTimeout(() => {
      setSpinning(false);
      setResult(options[index]);
      setSelectedIndex(index);
    }, 1900);
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="帮我选首页">
          <span className="brand-mark">选</span>
          <span>帮我选</span>
        </a>
        <div className="nav-links">
          <a href="#experience">在线体验</a>
          <a href="#features">功能亮点</a>
          <a className="nav-download" href={APK_URL}>下载 App</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>✦</span> 专治选择困难</div>
          <h1>别纠结了，<br /><em>让转盘帮你选。</em></h1>
          <p className="hero-lead">
            午饭吃什么？周末去哪儿？谁先开始？把选项交给「帮我选」，轻轻一点，公平又有趣地得到答案。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience">立即在线体验 <span>→</span></a>
            <a className="button button-secondary" href={APK_URL}>下载安卓 APK <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <span><b>✓</b> 无需注册</span>
            <span><b>✓</b> 公平随机</span>
            <span><b>✓</b> 本地保存</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="帮我选 App 界面展示">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="float-pill pill-one">今晚吃什么？</div>
          <div className="float-pill pill-two">周末去哪儿？</div>
          <div className="phone">
            <div className="phone-top"><span>9:41</span><i /></div>
            <div className="phone-body">
              <div className="phone-heading"><small>今天交给好运</small><strong>帮我选</strong></div>
              <div className="mini-wheel" style={{ background: wheelBackground }}>
                <div className="mini-center">选</div>
              </div>
              <div className="phone-option"><span>1</span>火锅<i>×</i></div>
              <div className="phone-option"><span>2</span>烧烤<i>×</i></div>
              <div className="phone-option"><span>3</span>日料<i>×</i></div>
              <div className="phone-button">✦ 帮我选</div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="使用场景">
        <div>吃什么 <span>✦</span> 去哪里 <span>✦</span> 买哪个 <span>✦</span> 谁先来 <span>✦</span> 看什么 <span>✦</span> 做不做</div>
      </section>

      <section className="experience shell" id="experience">
        <div className="section-heading">
          <div className="eyebrow"><span>✦</span> 现在就玩</div>
          <h2>不用下载，先让它替你决定一次</h2>
          <p>添加 2–8 个选项，点击转盘。所有选项机会相同。</p>
        </div>

        <div className="playground">
          <div className="wheel-panel">
            <div className="wheel-stage">
              <div className="pointer">▼</div>
              <div
                className={`web-wheel ${spinning ? "is-spinning" : ""}`}
                style={{ background: wheelBackground, transform: `rotate(${rotation}deg)` }}
              >
                <div className="wheel-rim" />
              </div>
              <div className="wheel-labels">
                {options.map((option, index) => {
                  const angle = (index / options.length) * Math.PI * 2 - Math.PI / 2;
                  const x = Math.cos(angle) * 112;
                  const y = Math.sin(angle) * 112;
                  return (
                    <span
                      className={selectedIndex === index ? "chosen" : ""}
                      key={`${option}-${index}`}
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      {option}
                    </span>
                  );
                })}
              </div>
              <button className="wheel-center" onClick={spin} disabled={spinning} aria-label="开始随机选择">
                {spinning ? "…" : "选"}
              </button>
            </div>
            <div className={`result-line ${result ? "show" : ""}`}>
              {result ? <>🎉 就决定是：<strong>{result}</strong></> : spinning ? "命运正在认真思考…" : "点击中间的「选」开始"}
            </div>
          </div>

          <div className="option-panel">
            <div className="option-panel-head">
              <div><small>你的问题</small><h3>今天吃什么？</h3></div>
              <span>{options.length} 个选项</span>
            </div>
            <div className="option-list">
              {options.map((option, index) => (
                <button key={`${option}-row-${index}`} onClick={() => removeOption(index)} title="点击删除">
                  <i style={{ background: colors[index % colors.length] }}>{index + 1}</i>
                  <b>{option}</b>
                  <span>×</span>
                </button>
              ))}
            </div>
            <div className="add-option">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && addOption()}
                placeholder={options.length >= 8 ? "最多添加 8 个" : "输入一个新选项"}
                disabled={options.length >= 8}
                maxLength={10}
                aria-label="新选项"
              />
              <button onClick={addOption} disabled={!draft.trim() || options.length >= 8}>＋ 添加</button>
            </div>
            <button className="big-spin" onClick={spin} disabled={spinning}>✦ {spinning ? "正在选择…" : "帮我选"}</button>
            <p className="fair-note">🔒 选择结果随机生成，不收集你的选项</p>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="shell">
          <div className="section-heading left">
            <div className="eyebrow"><span>✦</span> 小工具，大轻松</div>
            <h2>把纠结留给转盘，把时间还给自己</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card featured">
              <div className="feature-icon">🎡</div>
              <h3>有趣的随机转盘</h3>
              <p>多彩标签、流畅动画和惊喜结果，让每次决定都多一点仪式感。</p>
              <div className="feature-wheel"><span>选</span></div>
            </article>
            <article className="feature-card">
              <div className="feature-icon mint">☆</div>
              <h3>收藏常用清单</h3>
              <p>“今晚吃什么”“周末去哪儿”，常用选项保存后随时再用。</p>
              <div className="stacked-list"><i /><i /><i /></div>
            </article>
            <article className="feature-card">
              <div className="feature-icon coral">↺</div>
              <h3>自动保留记录</h3>
              <p>最近选过什么一目了然，想回顾时不用努力回忆。</p>
              <div className="history-lines"><i /><i /><i /></div>
            </article>
            <article className="feature-card wide">
              <div>
                <div className="feature-icon blue">⌁</div>
                <h3>隐私留在你的设备</h3>
                <p>无需注册登录，清单和历史保存在本机，简单、安心、随开随用。</p>
              </div>
              <div className="privacy-badge"><span>✓</span><strong>本地保存</strong><small>不上传你的选择</small></div>
            </article>
          </div>
        </div>
      </section>

      <section className="download shell" id="download">
        <div className="download-card">
          <div className="download-copy">
            <div className="eyebrow light"><span>✦</span> 装进手机，随时帮你选</div>
            <h2>下一次纠结，<br />交给「帮我选」。</h2>
            <p>安卓趣味版 v1.1.0 · 约 98 MB</p>
            <a className="button download-button" href={APK_URL}>下载安卓 APK <span>↓</span></a>
            <small>安装时如出现“未知来源”提示，请允许浏览器安装本次应用。</small>
          </div>
          <div className="download-art">
            <div className="big-wheel" style={{ background: wheelBackground }}><span>选</span></div>
            <div className="spark spark-one">✦</div><div className="spark spark-two">●</div><div className="spark spark-three">◆</div>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark">选</span><span>帮我选</span></a>
        <p>选择困难时，给自己一个轻松的答案。</p>
        <span>© 2026 帮我选</span>
      </footer>
    </main>
  );
}
