# the path to the input script to minify
in_path = "src/epub_cfi/epubcfi.js"

# the path to output the minifed script
out_path =  "release/epubcfi.min.js"

# path the the closure compiler jar file
jar_path = "build/tools/closure-compiler-v1346.jar"


#tasks:

desc "Concatenate all source files"
file "#{in_path}" do
	Rake::Task["gen_cfi_library"].invoke
end

desc "Minify the concatenated scipts"
file "#{out_path}" => "#{in_path}" do
	puts "minifying #{in_path}"
	output = `java -jar #{jar_path} --js #{in_path} --js_output_file #{out_path}`
end

desc "create the concatented and minified library"
task :build => "#{out_path}"