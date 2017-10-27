import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;

/**
 * @author Administrator
 */
public class JsonServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json; charset=utf-8");
        resp.setCharacterEncoding("UTF-8");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        System.out.println("请求开始");
        String path = getServletContext().getRealPath("/");
        String filePath = path + "data/data.json";
        System.out.println(filePath);
        File file = new File(filePath);
        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] buff = new byte[fileInputStream.available()];
        fileInputStream.read(buff);
        String s = new String(buff, "UTF-8");
        resp.getWriter().write(s);

    }
}
