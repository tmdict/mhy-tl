<script>
  import { localData } from '@store/sitedata';

  function download(content, filename, contentType = 'application/json;charset=utf-8') {
    // Generate date postfix for file name
    let date = new Date();
    const datetime = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0]
      .split('-')
      .join('');

    const a = document.createElement('a');
    const encoded = encodeURIComponent(JSON.stringify(content));
    a.setAttribute('download', `${filename}_${datetime}.json`);
    a.setAttribute('href', `data:${contentType},${encoded}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<a href="/#" on:click|preventDefault={() => download($localData, `genshin.tmdict.com`)}>Export Data</a>
