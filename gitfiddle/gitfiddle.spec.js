beforeEach(function() {
  this.addMatchers({
    toDeriveFrom: function(expected) {
      return this.actual instanceof expected;
    }
  });
});

describe('GitFiddle',function(){
  it('returns Gist if location is gist', function(){
    var location = "https://gist.github.com/606699/";
    expect(GitFiddle(location)).toDeriveFrom(GitFiddle.Gist);
  });
  it('returns Repo if location is repo', function(){
    var location = "https://github.com/jasonkarns/";
    expect(GitFiddle(location)).toDeriveFrom(GitFiddle.Repo);
  });
});

describe('Gist', function(){
  describe('#sounds_like_a_fiddle - true', function(){
    beforeEach(function(){
      affix("#files .file#file_fiddle");
    });
    it('returns true if fiddle.css is found', function(){
      //affix("#files .file#file_fiddle\\.css");
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
    });
    it('returns true if fiddle.html is found', function(){
      //affix("#files .file#file_fiddle\\.html");
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
    });
    it('returns true if fiddle.js is found', function(){
      //affix("#files .file#file_fiddle\\.js");
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
    });
    it('returns true if fiddle.manifest is found', function(){
      //affix("#files .file#file_fiddle\\.manifest");
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
    });
  });
  describe('#sounds_like_a_fiddle - false', function(){
    it('returns false if fiddle.(html|css|js|manifest) is not found', function(){
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
    });
    it('returns false if fiddle.fake is not found', function(){
      //affix("#files .file#file_fiddle\\.fake");
      expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
    });
  });
  describe('#id', function(){
    it('parses the gist id from the location', function(){
      expect(new GitFiddle.Gist({ pathname : '/606699/' }).id).toBe('606699');
    });
    it('handles sha hash', function(){
      var location = { pathname : '/606699/35b6e9d1037cb33da0943ceccf5ddde6bd362263/' };
      expect(new GitFiddle.Gist(location).id).toBe('606699');
    });
  });
  describe('#insert_link', function(){
    it('inserts link', function(){
      var meta = affix('#repos .meta table tbody');
      new GitFiddle.Gist({ pathname : '/606699/' }).insert_link();
      expect($(meta)).toContain('tr td.label');
      expect($(meta)).toContain('tr td a.gist-fiddle-link');
    });
  });
});

describe('LinksGist', function(){
  describe('#url', function(){
    it('is built from the gist id', function(){
      var gist_id = '606699';
      var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';
      expect(new GitFiddle.LinksGist(gist_id).url).toBe(fiddle_url);
    });
  });
  describe('#link', function(){
    var gist_id = '606699';
    var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';
    it('builds the link', function(){
      var subject = new GitFiddle.LinksGist(gist_id).link;
      //expect($(subject)).toBe('td a.gist-fiddle-link');
    });
    it('sets the href', function(){
      var subject = new GitFiddle.LinksGist(gist_id).link;
      //expect($(subject)).toHaveAttr('href', fiddle_url);
    });
    it('sets the text content', function(){
      var subject = new GitFiddle.LinksGist(gist_id).link;
      expect($(subject)).toHaveText(fiddle_url);
    });
  });
  describe('#label', function(){
    it('builds the label', function(){
      //var subject = new GitFiddle.LinksGist(gist_id).label;
      //expect($(subject)).toBe('td.label');
    });
  });
});