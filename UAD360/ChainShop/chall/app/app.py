from flask import Flask, g, session, request, render_template_string, render_template
from os import urandom
import sqlite3

app = Flask(__name__,static_url_path='/static')
app.jinja_env.auto_reload = True
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = urandom(120)

# Database config

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

# Utils

def is_blacklisted(product):
    blacklist = ["{{", "\\", "\"", "__class__", "__globals__", "__builtins__", "+"]

    for data in product:
        try:
            if any(element in data for element in blacklist):
                return True
        except Exception:
            pass
    return False

# Routes

@app.route('/',  methods=['GET'])
def index():
    search = request.args.get("search")
    query = "SELECT * FROM products"
    if search:
        query = query + f" WHERE name LIKE '%{search}%'"
    
    data = query_db(query)
    
    product_list = ""

    for product in data:
        if is_blacklisted(product):
            continue
        (id, name, image_url, price) = product
        product_list += f'''
        <div class="card col-xl-1 col-lg-6 col-md-6 col-sm-12 m-5" style="width: 18rem;">
            <img class="card-img-top" src="{image_url}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{price} $</h6>
            <a href="#" class="card-link">Buy</a>
            </div>
        </div>
        '''

    with open('templates/index.html',mode='r') as file:
        template = file.read()
        template = template.replace("##PRODUCTS##",product_list)
        return render_template_string(template)


init_db()
app.run(host='0.0.0.0', port=80)