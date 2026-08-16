(function () {
  var targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();

// 投票結果グラフ：下の voteCounts の6つの数字（スコア0〜5の得票数）を
// 書き換えるだけでグラフが自動的に更新されます。
(function () {
  var voteCounts = [0, 0, 0, 0, 0, 0]; // ← ここを実際の得票数に書き換える

  var chart = document.getElementById("voteChart");
  if (!chart) return;

  var max = Math.max(1, Math.max.apply(null, voteCounts));

  voteCounts.forEach(function (count, score) {
    var col = document.createElement("div");
    col.className = "vote-bar";

    var value = document.createElement("span");
    value.className = "vote-bar__value";
    value.textContent = count;

    var bar = document.createElement("div");
    bar.className = "vote-bar__fill";
    bar.style.height = (count / max) * 100 + "%";

    var label = document.createElement("span");
    label.className = "vote-bar__label";
    label.textContent = score;

    col.appendChild(value);
    col.appendChild(bar);
    col.appendChild(label);
    chart.appendChild(col);
  });
})();
