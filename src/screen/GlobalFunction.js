function dateDiffInDays(a, b) {
  const _Hours_PER_DAY = 24;
  const _Minutes_PER_DAY = 60 * _Hours_PER_DAY;
  const _Seconds_PER_DAY = 60 * _Minutes_PER_DAY;
  const _MilliSeconds_PER_DAY = 1000 * _Seconds_PER_DAY;
  const daysDifferent = Math.abs((a.getTime() - b.getTime()) / _MilliSeconds_PER_DAY);
  const onlyDaysDifferent = Math.floor(daysDifferent);
  var hour = (daysDifferent - onlyDaysDifferent) * 24;
  var onlyHour = Math.floor(hour);
  var minute = (hour - onlyHour) * 60;
  var onylyMinute = Math.floor(minute);
  if (onlyDaysDifferent > 0) {
    return `${onlyDaysDifferent}d ${onlyHour}h`;
  }
  return `${onlyHour}h ${onylyMinute}m`;
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
function roundHalf(num) {
  return (Math.round(num * 2) / 2).toFixed(1);
}
// For cross-browser scripting you're stuck with explicitly iterating over the properties and checking hasOwnProperty():
function countPropertiesMethod2(obj) {
  return Object.keys(obj).length;
}
// In case of ECMAScript 5 capable implementations, this can also be written as (Kudos to Avi Flax)
// https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip/4889658#4889658
function countPropertiesMethod1(obj) {
  var count = 0;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      ++count;
  }

  return count;
}


function output(inp) {
  document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

// var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
// var str = JSON.stringify(obj, undefined, 4);

// output(str);
// output(syntaxHighlight(str));

function oldDateDiffInDays(itemCreTime) {
  let creTime = new Date(itemCreTime);
  let today = new Date();
  let diff = new Date((Math.abs(today.getTime() - creTime.getTime())));
  var days = 0;
  var hours = diff / (1000 * 3600);
  while (hours > 23) {
    days += 1;
    hours -= 24;
  }
  let time_gap = ``;
  if (days != 0) {
    return time_gap = `${Math.floor(days)}d ${Math.floor(hours)}h`;
  }
  else {
    return time_gap = `${Math.floor(hours)}h`;
  }
}

// Retry Fetch
function wait(delay){
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url, delay = 3000, tries = 5, fetchOptions = {}) {
  function onError(err){
      triesLeft = tries - 1;
      if(!triesLeft){
          throw err;
      }
      return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
  }
  return fetch(url,fetchOptions).catch(onError);
}

export {
  countPropertiesMethod1,
  countPropertiesMethod2,
  roundHalf,
  groupBy,
  dateDiffInDays,
  oldDateDiffInDays,
}



(function () {
  if (typeof Object.defineProperty === 'function') {
    try { Object.defineProperty(Array.prototype, 'sortBy', { value: sb }); } catch (e) { }
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f) {
    for (var i = this.length; i;) {
      var o = this[--i];
      this[i] = [].concat(f.call(o, o, i), o);
    }
    this.sort(function (a, b) {
      for (var i = 0, len = a.length; i < len; ++i) {
        if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
      }
      return 0;
    });
    for (var i = this.length; i;) {
      this[--i] = this[i][this[i].length - 1];
    }
    return this;
  }
})();